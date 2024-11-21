SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

CREATE OR REPLACE TABLE Customers(
    customerID INT NOT NULL UNIQUE AUTO_INCREMENT,
    customerName VARCHAR(64) NOT NULL,
    customerType VARCHAR(16) NOT NULL,
    customerRace VARCHAR(16) NOT NULL,
    employeeID INT,
    PRIMARY KEY (CustomerID),
    FOREIGN KEY (employeeID) REFERENCES Employees(employeeID) ON DELETE SET NULL
);

CREATE OR REPLACE TABLE Employees(
    employeeID INT NOT NULL UNIQUE AUTO_INCREMENT,
    employeeName VARCHAR(64) NOT NULL,
    employeeRace VARCHAR(16) NOT NULL,
    PRIMARY KEY (employeeID)
);

CREATE OR REPLACE TABLE Products(
    productID INT NOT NULL UNIQUE AUTO_INCREMENT,
    itemName VARCHAR(64) NOT NULL,
    itemType VARCHAR(64) NOT NULL,
    itemRarity VARCHAR(16) NOT NULL,
    price DECIMAL(19,2) NOT NULL,
    quantityStocked INT NOT NULL,
    PRIMARY KEY (productID)
);

CREATE OR REPLACE TABLE SalesOrders(
    transactionID INT NOT NULL UNIQUE AUTO_INCREMENT,
    customerID INT NOT NULL,
    employeeID INT NULL,
    orderDate DATE NOT NULL,
    totalPrice DECIMAL(19,2) NOT NULL,
    PRIMARY KEY (transactionID),
    CONSTRAINT FOREIGN KEY (customerID) REFERENCES Customers(customerID) ON DELETE CASCADE,
    CONSTRAINT FOREIGN KEY (employeeID) REFERENCES Employees(employeeID) ON DELETE SET NULL
);

-- Transitional table for M:M relationship between SalesOrders and Products
CREATE OR REPLACE TABLE OrderProducts(
	orderID INT NOT NULL UNIQUE AUTO_INCREMENT,
    transactionID INT NOT NULL,
    productID INT NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY (orderID),
    FOREIGN KEY (transactionID) REFERENCES SalesOrders(transactionID) ON DELETE CASCADE,
    FOREIGN KEY (productID) REFERENCES Products(productID) ON DELETE CASCADE
);


SET FOREIGN_KEY_CHECKS=1;
COMMIT;
