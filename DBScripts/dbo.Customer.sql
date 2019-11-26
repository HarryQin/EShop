CREATE TABLE [dbo].[Customer]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [Name] VARCHAR(255) NOT NULL, 
    [Email] VARCHAR(255) NOT NULL, 
    [Password] VARCHAR(100) NOT NULL
)

GO

CREATE INDEX [IX_Customer_Email] ON [dbo].[Customer] (Email)

GO