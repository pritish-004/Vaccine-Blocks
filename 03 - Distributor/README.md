# Distributors installation <a name="TOP"></a>

## Requirements

    * python3 (3.8.10)
    * Flask
    * dateutil
    * Requests
    * pytest

## Installation Steps

This assignment is implemented on **Ubuntu-20 OS**.

If you want to install dependencies in **Windows OS**, then replacing commands with _python3_ with _python_ and _pip3_ with _pip_ would work.

### Step 1: Install visual studio code

### Step 2: Go to the folder that you want to install project

### Step 2: Set up virtual environment

```
sudo apt-get update
sudo apt-get install python3-venv
python3 -m venv blockchain-env
```

### Step 3: Activate the virtual environment

```
source blockchain-env/bin/activate
```

### Step 4: Check if the virtual environment is properly set

```
echo $VIRTUAL_ENV
```

### Step 5: Install pip3

```
sudo apt-get install python3-pip
```

### Step 5: Install pip3

```
sudo apt-get install npm
```

### Step 5: Check npm and npx are installed properly

``` 
npm -v
npx -v
```

### Step 6.a: Install all the dependencies required for the project

```
pip3 install -r requirements.txt
```

### Step 6.b: Check the following commands if you wish to install individual dependencies. (Optional)

```
pip3 install Flask==1.1.1
pip3 install pubnub==4.1.6
pip3 install requests==2.22.0
pip3 install cryptography==2.7
pip3 install Flask-Cors==3.0.8
pip3 install pycrypto
pip3 install pyqrcode
pip3 install pypng
pip3 install qrcode
pip3 install qrcode[pil]

pip3 install opencv-python
sudo apt-get install libzbar0
pip3 install pyzbar
```

### Step 7: Make sure you have activated the virtual enironment

```
source Wolt-env/bin/activate
```


### Step 7: create frontend folder
npx create-react-app frontend

### Step 7: Create MF-QR-codes folder in desktop
### Step 7: Copy all relevant folders and files in frontend folder
### Step 7: Go to frontend folder
### Step 7: cd frontend

```
npm i react-bootstrap --save
npm i react-router@5.0.1 react-router-dom@5.0.1 history@4.9.0 --save
npm install react-bootstrap-table-next --save
npm install react-bootstrap-table2-filter --save
```

### Step 7: start frontend server

```  
npm run start
```

### Step 7: open another terminal, go to project folder, python-blockchain and start backend python server

```
source blockchain-env/bin/activate
python3 -m backend.app
```
