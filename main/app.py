from flask import Flask, render_template, jsonify, request
from src.helper import download_hugging_face_embeddings
from langchain.vectorstores import Pinecone
import pinecone
from langchain.prompts import PromptTemplate
from langchain.llms import CTransformers
from langchain.chains import RetrievalQA
from dotenv import load_dotenv
from src.prompt import *
import os
import numpy as np
import pandas as pd
from scipy.stats import mode
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.svm import SVC
from sklearn.naive_bayes import GaussianNB
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, confusion_matrix
import warnings
from sklearn.model_selection import KFold, cross_val_score
from statistics import mode

app = Flask(__name__)

load_dotenv()

PINECONE_API_KEY = "1d6a261c-286d-4ee6-99fb-316a8c6efd4e"
PINECONE_API_ENV = "gcp-starter"

#disease prediction code -->
train_data_path="chatbot/main/Testing.csv"
test_data_path="chatbot/main/Testing.csv"
train_data=pd.read_csv(train_data_path).dropna(axis=1)
test_data=pd.read_csv(test_data_path).dropna(axis=1)

disase_counts=train_data['prognosis'].value_counts()
temp_dataframe=pd.DataFrame({
    'disease': disase_counts.index,
    'counts':disase_counts.values
})

# we need to convert the data numbers into a value the data in the program because the data is of string type we need to convert them to numeric data type
# We can use labelencoder to convert string data type to numeric data


encoder=LabelEncoder()
train_data['prognosis']=encoder.fit_transform(train_data['prognosis'])
test_data['prognosis']=encoder.fit_transform(test_data['prognosis'])

# here, the data is x as the other desired data, and the y value represents the numerical data under prognasis.
x=train_data.iloc[:,:-1]
y=train_data.iloc[:,-1]

# of data
x_train,x_test,y_train,y_test=train_test_split(x,y,test_size=0.2,random_state=24)

# first we need to calculate the scoring metric to use in k-fold

def cv_scoring(estimator,x,y):
    return accuracy_score(y, estimator.predict(x))

models={
    "SVC":SVC(),
    "Gaussian NB":GaussianNB(),
    "Random Forest":RandomForestClassifier(random_state=18),
}

# points are generated at this stage

for model_name in models:
    model = models[model_name]
    kfold = KFold(n_splits=10, shuffle=True, random_state=42)  # Regular use of KFold
    scores = cross_val_score(model, x, y, cv=kfold, scoring=cv_scoring, n_jobs=-1)

# let's do the svm model training first
svmModel=SVC()
svmModel.fit(x_train,y_train)
preds=svmModel.predict(x_test)
# Naive Bayes Classifier with training data
nb_model=GaussianNB()
nb_model.fit(x_train,y_train)
nbModelPredict=nb_model.predict(x_test)
# Finally, data training with Random Forest Calssifier
randomForestModel=RandomForestClassifier(random_state=18)
randomForestModel.fit(x_train,y_train)
randomForestModelPredict=randomForestModel.predict(x_test)

svmModelFit = SVC()
nbModelFit = GaussianNB()
rfModelFit = RandomForestClassifier(random_state=18)

svmModelFit.fit(x, y)
nbModelFit.fit(x, y)
rfModelFit.fit(x, y)

test_x = test_data.iloc[:, :-1]
test_y = test_data.iloc[:, -1]

svmPredicts = svmModelFit.predict(test_x)
nbModelPredicts = nbModelFit.predict(test_x)
rfModelPredicts = rfModelFit.predict(test_x)

# Mode function with handling for no clear mode
def safe_mode(lst):
    try:
        return mode(lst)
    except:
        return max(set(lst), key=lst.count)

final_preds = [safe_mode([i, j, k]) for i, j, k in zip(svmPredicts, nbModelPredicts, rfModelPredicts)]

symptoms = x.columns.values

# input symptoms into numerical form
symptom_index = {}
for index, value in enumerate(symptoms):
	symptom = " ".join([i.capitalize() for i in value.split("_")])
	symptom_index[symptom] = index

data_dict = {
	"symptom_index":symptom_index,
	"predictions_classes":encoder.classes_
}

def predictDisease(symptoms):
	symptoms = symptoms.split(",")

	input_data = [0] * len(data_dict["symptom_index"])
	for symptom in symptoms:
		index = data_dict["symptom_index"][symptom]
		input_data[index] = 1


	input_data = np.array(input_data).reshape(1,-1)

	# generating individual outputs
	rf_prediction = data_dict["predictions_classes"][rfModelFit.predict(input_data)[0]]
	nb_prediction = data_dict["predictions_classes"][nbModelFit.predict(input_data)[0]]
	svm_prediction = data_dict["predictions_classes"][svmModelFit.predict(input_data)[0]]

	# making final prediction by taking mode of all predictions
	final_prediction = mode([rf_prediction, nb_prediction, svm_prediction])
	predictions = {
		"rf_model_prediction": rf_prediction,
		"naive_bayes_prediction": nb_prediction,
		"svm_model_prediction": svm_prediction,
		"final_prediction":final_prediction
	}
	return predictions

#chatbot-->
embeddings = download_hugging_face_embeddings()

#Initializing the Pinecone
pinecone.init(api_key=PINECONE_API_KEY,
              environment=PINECONE_API_ENV)

index_name="medical-bot"

#Loading the index
docsearch=Pinecone.from_existing_index(index_name, embeddings)


PROMPT=PromptTemplate(template=prompt_template, input_variables=["context", "question"])

chain_type_kwargs={"prompt": PROMPT}

llm=CTransformers(model="model/llama-2-7b-chat.ggmlv3.q4_0.bin",
                  model_type="llama",
                  config={'max_new_tokens':512,
                          'temperature':0.8})


qa=RetrievalQA.from_chain_type(
    llm=llm, 
    chain_type="stuff", 
    retriever=docsearch.as_retriever(search_kwargs={'k': 2}),
    return_source_documents=True, 
    chain_type_kwargs=chain_type_kwargs)



@app.route("/chatbot")
def index():
    return render_template('chat.html')



@app.route("/chatbot/get", methods=["GET", "POST"])
def chat():
    msg = request.form["msg"]
    input = msg
    print(input)
    result=qa({"query": input})
    print("Response : ", result["result"])
    return str(result["result"])


@app.route('/predict_disease', methods=['POST'])
def handle_disease_prediction():
    try:
        data = request.get_json()
        symptoms = data.get('symptoms', [])
        symptom_string = ','.join(symptoms)
        prediction = predictDisease(symptom_string)
        return jsonify(prediction), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port= 8080, debug= True)


