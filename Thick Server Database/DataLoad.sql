#Thick Server Data Load

LOAD DATA LOCAL INFILE 'C:/Users/roger/Downloads/gun-violence-data/gun-violence-data_01-2013_03-2018.csv' 
INTO TABLE gundata
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"' 
LINES TERMINATED BY '\n'
IGNORE 1 LINES