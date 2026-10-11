---
title: How to use Google Sheets as a database for web applications?
date: 2024-03-04
description: Using Google Sheets as a free database for web applications - Pros, Cons, and implementing CRUD operations with the Google Sheets API in JavaScript and Python.
tags: [Google Sheets, JavaScript, Python, API]
coverImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1699371332323/99fe6618-47fe-4a7a-8a9b-c9778bfc7cb1.jpeg
readingTime: 9
---

As Developers, we know how critical data a Database is to an App or website. It becomes more important after we come to the fact that every other app is using Database if it's meant to store data of any kind. Getting a free-to-use-for-lifetime Database is kind of like a gift.

What if you can use Google products as a database for your project/software, Google Sheets is not intended for this usage, but a Developer can develop anything if there's a need. In this article, we'll Install Google Sheets as a Database for a Web Application and discuss its advantages and disadvantages.

## What is Google Sheets??

Google Sheets is an alternative to Microsoft Excel, though It comes with its advantage over Microsoft Excel which leads to the usage of Google Sheets as a database. It allows users to perform storage of Data in a tabular format and also perform Arithmetical Operations on that data.

Spreadsheet applications were not allowed to be used as a Database. Still, due to the company's limited budget and users requiring simple solutions instead of the standard SQL queries for Non-technical users, it's the best alternative for any Company. As you might already know a traditional Database requires extensive effort to set up and maintain.

## When to use Google Sheets instead of your Traditional Database??

Traditional Databases are good and they can manage huge amounts of data with very little effort with the help of SQL Queries or even No-SQL data can do it without using SQL Queries. Google Sheets however can perform the same task for you if your needs are small in data and can even give you high productivity instead of managing your Traditional Databases.

### Pros of Google Sheets as a Database

Being a Product by Google itself Google Sheets has an advantage over the other Excel solutions over the internet, a huge advantage of Google Sheets being a free-forever product Google.

* **Connectivity** Google Sheets is an online web application that means that a user can easily check his files and data from anywhere in the world, just by logging in to his Google account and all of the Data will be available there to use.
* **Access Control** In Google Sheets, you have control over files with Google's access control System, which means you can easily create new files, delete an existing file, or even modify the files without the hassle of more technical things being taken care of.
* **Pricing** Google Sheets is a free-for-used product by Google, when compared with Microsft Excel, it's also free to consume with a Google account ( which is also free ).
* **Learning to use Google Sheets** It is very easy to learn as a beginner and if you already are a user of Libre Calc or Microsoft Excel then you already know how to use it.

### Cons of Google Sheets as a Database

The software doesn't come with only advantages, it also comes with its own set of Cons, and so do Google Sheets.

* **Scalability** When the data in the Sheets becomes larger and larger the response time of the Sheets becomes slower.
* **Query Options** Google Sheets provides a way to manipulate data and efficiently store them, but still when it comes to the Query management of the traditional DataBases they can handle the data in a much easier and more efficient manner with the queries.
* **Sharability** Traditional Databases can always be used by multiple users at the same time, but that's not the case with Google Sheets, it can only be used by most two users at the same time, not to mention that when the data gets huge in an amount the response time also decreases.

These were some of the Advantages and Disadvantages of Google Sheets as a Database, let's move forward to install it as our Database for a web application.

## Database Operations in Google Sheets

Let's say that you want to add the details of something, so basically what you want to do is that you want to add a new record in the Google Spreadsheet with the necessary information. This process is called `Create`.

Then let's say you entered some wrong info and you want to change it, This process is called `Update`, and removing a particular record from the sheets or Database it's called `Delete`.

If you just want to get the data from the Database and nothing modification, addition, or deletion of data is being performed, then the process is called `Read`.

We also call this process `CRUD`. Google Sheets provides an API through which you can easily use the process of `CRUD` using the given API. If you want to use it as your Database then you won't be adding the information every time by yourself, it must have to be automated, and you can perform this with any of your known programming languages in the Backend

* JavaScript
* C#
* Golang
* Java
* Node.js
* PHP
* Python
* Ruby

These Languages can help you to automate most of the tasks relating to the database. You no longer have to open and perform the `CRUD` operation on your own, these languages will do all that on your behalf.

## Install Google Sheets for your Database

To automate all these tasks you must first authenticate yourself to the Google Console, you can use Outh2.0 which makes our authentication part much easier.

### Setup Google Sheets for usage using API

* Open up the `Google Console`
* Create a New Project
* Fill in your Information and create a new Project in the Google Console for free.
* Enable the Google Sheets API from the Marketplace
* Click on Create Credentials
* From the Credentials tab, Select Create Credentials as a Service Account
* Now fill in the details required and click on Create and Continue
* Select the Account Access of the Service account to Project &gt; Editor.
* Click on Done and you're pretty much Done.
* Click on the Service Account
* Now move to the Keys Tab and Click Create New Key
* Select JSON
* Done

### Reading from the Spreadsheets

As we've now obtained the secret keys for Google Sheets, let's now access the Google Spreadsheets using the JavaScript code mentioned below

```js
let googleapis = require('googleapis')
let keys = require('./googleapis.json')
let authClient = new googleapis.auth.JWT(keys.client_email, null, keys.private_key, [
  'https://www.googleapis.com/auth/spreadsheets',
])

authClient.authorize(function (error, tokens) {
  if (error) {
    console.error(error)
    return
  } else {
    console.info('Connected to Google Sheets API')
  }
})

let SheetsID = 'SheetsID'
let rangeOfSheets = 'Homepage_Data!A1:C10'
let gsheets = googleapis.sheets('v4')
gsheets.spreadsheets.values.get(
  {
    auth: authClient,
    spreadsheetId: SheetsID,
    range: rangeOfSheets,
  },
  function (error, res) {
    if (error) {
      console.error('Error Connecting with the Database')
    } else {
      console.info('Sucessfully Connected with the Database')
      return res
    }
  }
)
```

### Write to Google Sheets

```js
let googleapis = require('googleapis')
let keys = require('./googleapis.json')
let authClient = new googleapis.auth.JWT(
  keys.client_email,
  null,
  keys.private_key,
  [
    'https://www.googleapis.com/auth/spreadsheets',
  ]
)

authClient.authorize(function (error, tokens) {
  if (error) {
    console.error(error)
    return
  } else {
    console.info('Connected to Google Sheets API')
  }
})

let SheetsID = 'SheetsID'
let rangeOfSheets = 'Homepage_Data!A1:C10'
let gsheets = googleapis.sheets('v4')
let data = [
  [
    "35473",
    "Aman",
    "coderaman7",
    "918465282323",
    "coderaman7@gmail.com"
  ]
];
const sheetData = {
  data,
};
gsheets.spreadsheets.values.update({
   auth: authClient,
   spreadsheetId: SheetsID,
   range: rangeOfSheets,
   resource: sheetData
}, function (error, res) {
   if (error) {
       console.error("Error Writing to the Database");
   } else {
       console.info('Sucessfully written to the Database');
       return res
   }
});
```

## Use Google Sheets as a Database for your Django App

If you're a Python Developer or even a Web Developer you must know Django. Django is a Web Framework in Python which makes it easier to write, maintain and develop backend systems easily by writing just Pure Python Code.

Python is a very popular language that is being used for developing most applications because it is easy to use and learn. Python has a framework named Django. Django is a framework that makes web development easier to write and maintain the web application with security.

Let's see the Code for Reading and Writing in Google Sheets using Python inside your Django App.

Below is the code mentioned which helps to perform `CRUD` operations using Python inside your Django App.

### Code to Read from Google Sheets using Python

```py
import gspread
from oauth2client.service_account import ServiceAccountCredentials

API_url = ['https://www.googleapis.com/auth/spreadsheets']
credentials = ServiceAccountCredentials.from_json_keyfile_name('secretKeys.json', API_url)
auth = gspread.authorize(credentials)

gsheet = auth.open("Codedamn Articles by @coderaman7").sheet1

gsheet.get_all_values()
```

### Code to Write on Google Sheets using Python

```py
import gspread
from oauth2client.service_account import ServiceAccountCredentials

API_url = ['https://www.googleapis.com/auth/spreadsheets']
credentials = ServiceAccountCredentials.from_json_keyfile_name('secretKeys.json', API_url)
auth = gspread.authorize(credentials)

gsheet = auth.open("Codedamn Articles by @coderaman7").sheet1

data = ["I","am","coderaman7"]
place = 1
gsheet.insert_row(data, place)
```

## Conclusion

In this article, we discussed the Pros and Cons of using Google Sheets as a Database. Although this is a free and easy-to-use Database to store a minimum amount of Data still this should be only used if the Data is small in size because Google Sheets can't handle data in huge sizes due to slow responsiveness.

Thanks for Reading
Happy Hacking