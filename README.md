Shippable.Dashboard
============================


Setup
--------------
1.  Install supervisor. ```npm install supervisor -g```

2.  Change ```config/dev.js``` github section with the values of your Github App.

3.  Install dependencies ```npm install```

4.	Edit ```.seed.csv' file to add yourself to the whitelist of allowed logins.
	Run ```make seed``` to seed the database.

5.  ```npm start``` should start the server via supervisor

6.  ```npm test``` will output test data in spec format.

Info
---------------
1.  ```Makefile``` has configuration setup for shippable.yml to output test and coverage data to specific folders



