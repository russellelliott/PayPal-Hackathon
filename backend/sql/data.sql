DELETE FROM textblocks;

--Insert Header
INSERT INTO textblocks (id, type, content, timestamp) VALUES (gen_random_uuid(), 'h1', 'Welcome to our Website', CURRENT_TIMESTAMP);

-- Insert Paragraph
INSERT INTO textblocks (id, type, content, timestamp) VALUES (gen_random_uuid(), 'p', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lobortis hendrerit ipsum, vel mattis erat.', CURRENT_TIMESTAMP);

DELETE FROM imageblocks;

-- Inserting an image
INSERT INTO imageblocks (id, height, width, src, timestamp) VALUES (gen_random_uuid(), 600, 800, 'https://example.com/images/example.jpg', CURRENT_TIMESTAMP);

-- Inserting another image
INSERT INTO imageblocks (id, height, width, src, timestamp) VALUES (gen_random_uuid(), 400, 600, 'https://example.com/images/another-example.png', CURRENT_TIMESTAMP);