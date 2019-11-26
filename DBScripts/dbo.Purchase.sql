CREATE TABLE [dbo].[Purchase]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [UserId] INT NOT NULL, 
    [ProductId] INT NOT NULL, 
    CONSTRAINT [FK_Purchase_ProductId] FOREIGN KEY (ProductId) REFERENCES Product(Id),
	CONSTRAINT [FK_Purchase_UserId] FOREIGN KEY (UserId) REFERENCES Customer(Id)
)
