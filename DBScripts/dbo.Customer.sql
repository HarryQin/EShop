CREATE TABLE [dbo].[Customer] (
    [Id]       INT           NOT NULL IDENTITY,
    [Name]     VARCHAR (255) NOT NULL,
    [Email]    VARCHAR (255) NOT NULL,
    [Password] VARCHAR (100) NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
CREATE NONCLUSTERED INDEX [IX_Customer_Email]
    ON [dbo].[Customer]([Email] ASC);

