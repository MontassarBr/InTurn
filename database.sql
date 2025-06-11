CREATE DATABASE inTurn; 
USE inTurn;



CREATE TABLE User ( 
    userID INT AUTO_INCREMENT PRIMARY KEY, 
    email VARCHAR(255) UNIQUE NOT NULL ,
    password VARCHAR(255) NOT NULL ,
    location VARCHAR(50),
	description TEXT ,
    userType enum('Student', 'Company') NOT NULL,
    profilePic VARCHAR(255) -- Store the image URL
);

ALTER TABLE User
MODIFY ProfilePic MEDIUMTEXT;



CREATE TABLE Company ( 
	companyID INT PRIMARY KEY, 
    companyName VARCHAR(255) NOT NULL, 
    website VARCHAR(255) UNIQUE ,
    industry VARCHAR(100) ,
    workDayStart ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'),
	workDayEnd ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'),
    FOREIGN KEY (companyID) REFERENCES User(userID)
);



CREATE TABLE Student ( 
	studentID INT PRIMARY KEY, 
    firstName VARCHAR(50) NOT NULL,
	lastName VARCHAR(100) NOT NULL,
    cvFile VARCHAR(255) ,
    about TEXT,
    title VARCHAR(255),
    openToWork bool,
    FOREIGN KEY (studentID) REFERENCES User(userID)
);



CREATE TABLE Review (
    reviewID INT AUTO_INCREMENT PRIMARY KEY,  
    studentID INT NOT NULL,                  
    companyID INT NOT NULL,                  
    rating DECIMAL(2, 1) NOT NULL CHECK (rating BETWEEN 1 AND 5) NOT NULL,                      
    description TEXT,                         
    reviewDate DATETIME DEFAULT CURRENT_TIMESTAMP, 
    FOREIGN KEY (studentID) REFERENCES Student(studentID), 
    FOREIGN KEY (companyID) REFERENCES Company(companyID)  
);



CREATE TABLE Education ( 
    studentID INT NOT NULL,   
    institution VARCHAR(255) NOT NULL,
	diploma VARCHAR(100) NOT NULL,
    location VARCHAR(100),
	startDate DATE NOT NULL,
	endDate DATE NOT NULL,
    FOREIGN KEY (studentID) REFERENCES Student(studentID),
    CONSTRAINT edu_pk PRIMARY KEY(studentID, institution, diploma)
);

CREATE TABLE Skills ( 
    studentID INT NOT NULL,   
    skill VARCHAR(100) NOT NULL,
    FOREIGN KEY (studentID) REFERENCES Student(studentID),
    CONSTRAINT skills_pk PRIMARY KEY(studentID, skill)
);

CREATE TABLE ProExperience ( 
	experienceID INT AUTO_INCREMENT PRIMARY KEY, 
    studentID INT NOT NULL,   
    title VARCHAR(100) NOT NULL,
    startDate DATE NOT NULL,
    employmentType enum('part time', 'full time'),
	endDate DATE NOT NULL,
    companyName VARCHAR(255) NOT NULL ,
    description TEXT,
    FOREIGN KEY (studentID) REFERENCES Student(studentID)
);

ALTER TABLE Education
MODIFY COLUMN endDate DATE NULL;



CREATE TABLE CompanyBenefit ( 
    benefit VARCHAR(100) NOT NULL ,
    companyID INT NOT NULL,  
    PRIMARY KEY (benefit, companyID),
    FOREIGN KEY (companyID) REFERENCES Company(companyID) 
);



CREATE TABLE Internship (
    internshipID INT AUTO_INCREMENT PRIMARY KEY, 
    companyID INT NOT NULL,  
    title VARCHAR(100) NOT NULL,
    startDate date NOT NULL,
    endDate date NOT NULL,
    minSalary DECIMAL(10, 2),
    maxSalary DECIMAL(10, 2),
    description TEXT,
    location VARCHAR(50) NOT NULL,
    payment ENUM ('paid', 'unpaid') ,
    workArrangement enum('Remote', 'Onsite', 'Hybrid'),
    workTime enum('Full Time', 'Part Time'),
    postedDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Use DATETIME instead of DATE
    status ENUM('Pending', 'Published', 'Expired', 'Filled') NOT NULL,
    CONSTRAINT chk_dates2 CHECK (maxSalary >= minSalary),
    FOREIGN KEY (companyID) REFERENCES Company(companyID)
);





CREATE TABLE Responsibility ( 
    responsibility VARCHAR(100) NOT NULL ,
    internshipID INT NOT NULL,  
    PRIMARY KEY (responsibility, internshipID),
    FOREIGN KEY (internshipID) REFERENCES Internship(internshipID) 
);


CREATE TABLE Application (
    studentID INT NOT NULL,                  
    internshipID INT NOT NULL,                  
    applicationDate DATE NOT NULL, 
    status ENUM('Pending', 'Accepted', 'Rejected') NOT NULL,
    PRIMARY KEY (studentID, internshipID ,applicationDate ),
    FOREIGN KEY (studentID) REFERENCES Student(studentID), 
    FOREIGN KEY (internshipID) REFERENCES Internship(internshipID)  
);





