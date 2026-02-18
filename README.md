# CowCatalog

Steps to run the code:
->Clone the code into your local.
->Checkout to "master" branch
->Run "npm install" command to install the node_modules
->Run "ng serve" command to run the application in local on port "http://localhost:4200"

Approach:
I have used the Signals based approach for reactive updates. 
-> Data storage is handled in cow-storage.service.ts
-> Add Cow details and filter logic is added in cow-catalog.service.ts
-> Used Reactive forms for creating new cow data and validations
