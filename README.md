# CSV to Charts

In this repository the following tasks are undertaken:
- Upload your desired csv.
- Select the data you want to plot in chart/graph.
- View that respective chart.
- Download it in .png format. 

## Versions & dependencies

1. node: 23.6.1 
2. npm: 11.0.0 
3. nvm: 1.2.2 
4. react: 19.0.0 
5. react-router-dom: 7.5.3 
6. recharts: 2.15.3 
7. papaparse: 5.5.2
8. axios: 1.9.0
9. @mui/material: 7.0.2


## Prerequisites

### Install Node JS

Refer to https://nodejs.org/en/ to install nodejs

## Cloning and Running the Application in local

Clone the project into local

Go into the project folder and install all npm packages:

```bash
cd "Folder_Name"
```

```bash
npm install
```

In order to run the application Type the following command

```bash
npm run dev
```

## Project Description

This project aims to convert data from a csv file to charts. It has been created using recharts library in react.js. Firstly we upload a csv which is then converted to json by papaparse library. Then slicing to desired entries. Further, it is converted to various charts, selecting the x-axis labels and the column names to be plotted. Further the chart is converted to svg and then to png using javascript and then to a downloadable .png file.