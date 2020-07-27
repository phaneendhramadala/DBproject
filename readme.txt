                                                       Project Phase 2: DataBase Management Tool
													   -------------------***-------------------

Front-end : HTML, CSS, Bootstrap, Javascript
Back-end  : Node.js, express framework (Node.js web application framework)

Instructions (How to run):
-------------------------
	
	**************** Dependencies you require to run the code ****************
	*			                                                             *
	*		body-parser, express, express-fileupload, mysql, nodemon         *
	*					                                                     *
	**************************************************************************
	
	1. Download the zip file and extract it to a new folder.
	2. In XAMPP start the servers "Apache" and "Mysql".
	3. Open the command prompt on the folder where you extracted the zip file and run the command "npm install" (Don't give quotes I 
	   mentioned it in quotes to highlight the command).
	4. Run the command "npm start". Now your backend server is up and running and your mysql database is also up and running.
	5. In XAMPP next to Mysql you will Admin button click on that button it will navigate to a webpage "phpmyadmin" 
	   create a database with name "phanifinalproject".
	6. Create the tables in phanifinalproject database.
	7. Go to browser and give url "http://localhost:5000/".
	8. You can see the webpage with name DataBase Management Tool.
	9. Now you are all set to navigate to different tabs and perform the operations you want.
	

Datasets:
---------
	   I have created 3 datasets for players tables
		1. Dataset-1 - 10,000 tuples   - players1.txt
		2. Dataset-2 - 100,000 tuples  - players2.txt
		3. Dataset-3 - 1000,000 tuples - players3.txt

Timings:
-------
        Single Insertion:
	    ----------------
		1. Time taken to insert 10K tuples using single insertion is   : 48.524   seconds
		2. Time taken to insert 100K tuples using single insertion is  : 503.499  seconds   ----> 8  minutes 23 seconds
		3. Time taken to insert 1000K tuples using single insertion is : 5492.231 seconds   ----> 91 minutes 32 seconds  ----> 1 hour 31 minutes 32 seconds
			
	    Multi-row insertion:
	    -------------------
		1. Time taken to insert 10K tuples using multi-row insertion is   : 2.257  seconds
		2. Time taken to insert 100K tuples using multi-row insertion is  : 4.384  seconds
		3. Time taken to insert 1000K tuples using multi-row insertion is : 26.233 seconds
				
	    Load Data Insertion:
	    -------------------
		1. Time taken to insert 10K tuples using load data insertion is   : 0.681  seconds
		2. Time taken to insert 100K tuples using load data insertion is  : 1.391  seconds
		3. Time taken to insert 1000K tuples using load data insertion is : 13.778 seconds
				
		********************************************************************************************************************
		*    When we compare different types of sql insertions based on their execution time it is clearly evident that:   *
		*                           Load Data Insertion < Multi-row Insertion < Single Insertion                           *
		********************************************************************************************************************
		
		********************************************************************************************************************
		*            Final Conclusion : For all the 3 datasets, Load Data Insertion execution is the fastest               *
		********************************************************************************************************************