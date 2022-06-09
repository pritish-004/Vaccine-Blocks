# Wolt Grade - Software Engineer Program Assignment - Pritish Naik <a name="TOP"></a>

## Requirements

    * python3 (3.8.10)
    * Flask
    * dateutil
    * Requests
    * pytest

## Installation Steps

This assignment is implemented on **Ubuntu-20 OS**.

If you want to install dependencies in **Windows OS**, then replacing commands with _python3_ with _python_ and _pip3_ with _pip_ would work.

### Step 1: Go to the folder that you want to install the project.

### Step 2: Set up the virtual environment

```
sudo apt-get update
sudo apt-get install python3-venv
python3 -m venv Wolt-env
```

### Step 3: Activate the virtual environment

```
source Wolt-env/bin/activate
```

### Step 4: Check if the virtual environment is properly set

```
echo $VIRTUAL_ENV
```

### Step 5: Install pip3

```
sudo apt-get install python3-pip
```

### Step 6.a: Install all the dependencies required for the project

```
pip3 install -r requirements.txt
```

### Step 6.b: Check the following commands if you wish to install individual dependencies. (Optional)

```
pip3 install Flask==2.0.2
pip3 install requests==2.26.0
pip3 install pytest==6.2.5
pip3 install python-dateutil==2.8.2
```

### Step 7: Make sure you have activated the virtual enironment

```
source Wolt-env/bin/activate
```

### Step 8: Start the backend application

```
python3 -m backend.app
```

### Step 9: Run the Testcases

Open another terminal, go to project folder and follow the following instructions

### Step 9.a: Activate the virtual enironment

```
source Wolt-env/bin/activate
```

### Step 9.b: Start the tests

```
python3 -m pytest backend/tests
```

### If you want to use Postman:

Base url: http://127.0.0.1:5000/calculate-delivery-fee

Input JSON data:

```javascript
{
    "cart_value": 790,
    "delivery_distance": 2235,
    "amount_of_items": 4,
    "time": "2021-10-12T13:00:00Z"
}
```

Output JSON data:

```javascript
{
    "delivery_fee": 710
}
```

## Description and Approach

### Assumptions for the special rule:

    * As the delivery is free (0€) when the cart value is equal or more than 100€, I have assumed that the delivery fee includes the possible surcharge fees which would also be free(0€).

    * During the Friday rush (3 - 7 PM UTC), the delivery fee will be multiplied by 1.1x. Here, I have assumed that the exact time 7PM(19:00:00Z) is excluded.

    * Delivery distance can cannot be Zero.(No option of Takeaway).

### Error messages:

Error management considers following and returns relevant standard API code:

    * The application responds with HTTP response code = 400 if the cart value, delivery distance and amount of items are less than or equal to zero.

    * The application responds with HTTP response code = 400 if the cart value, delivery distance and amount of items are not of integer type.

    * The time must be a string in ISO format. Otherwise, the application responds with HTTP response code 400 error.

    * HTTP Post request must contain all the required fields, any missing field will throw response code 404 error.

### Return codes

    * 200: OK Successful.
    * 400: Bad Request, Bad input parameters.
    * 404: Missing JSON parameters.
