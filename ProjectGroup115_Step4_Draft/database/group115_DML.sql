SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

INSERT INTO Employees(
    employeeName,
    employeeRace
)

VALUES
    ('Bob', 'Human'),
    ('Carlenia', 'Elf'),
    ('Bort Rockstone', 'Dwarf')
;
INSERT INTO Customers(
    customerName,
    customerType,
    customerRace,
    employeeID
)
VALUES
    ('Joseph Carlson', 'Adventurer', 'Human', '1'),
    ('Emma Rose', 'Merchant', 'Elf', 'NULL'),
    ('Grumly Rockstone', 'Miner', 'Dwarf', '2'),
    ('Grog Skullcrusher', 'Mercenary', 'Orc', '3')
;

INSERT INTO Products(
    itemName,
    itemType,
    itemRarity,
    price,
    quantityStocked
)
Values
    ('Hammer +1', 'Weapon','Unommon', 50.00, 3),
    ('Rations', 'Food','Common', 5.00, 20),
    ('Potion of Healing', 'Potion','Common', 100.00, 5)
;

INSERT INTO SalesOrders(
    customerID,
    employeeID,
    orderDate,
    totalPrice
)
VALUES
    (3, 1, '2024-11-01', 60.00),
    (1, 2, '2024-11-02', 100.00);


INSERT INTO OrderProducts(
    transactionID,
    productID,
    quantity
)
VALUES
    (1, 1, 2), -- 2 Swords in order 1
    (1, 3, 5), -- 5 Potions in order 1
    (2, 2, 1); -- 1 Shield in order 2


SET FOREIGN_KEY_CHECKS=1;
COMMIT;
