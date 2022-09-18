-- create table
CREATE TABLE "tasks" (
		"id" serial primary key,
		"task_name" varchar(60) NOT NULL,
		"is_complete" boolean NOT NULL,
		"due" date,
		"date_completed" date,
		"notes" varchar(1000));

-- sample table values
INSERT INTO "tasks" ("task_name", "is_complete", "due", "date_completed","notes")
VALUES			('water plants', false, '1-1-2023', NULL, 'don''t water cactus!'),
				('feed dog', true, '12-25-2022', '12-24-2023', 'give him the good stuff'),
				('do homework', false, '09-18-2022', NULL, 'make that todo list really flashy');
				
				
-- Create New Task Query
INSERT INTO "tasks" ("task_name", "is_complete", "due", "date_completed","notes")
VALUES				('task', true, '1-1-2023', NULL, 'your notes here');

-- Refresh List (GET/SELECT)
SELECT * FROM "tasks";

--Delete item from list
DELETE FROM "tasks" WHERE "id" = 6;

--Mark task as complete (PUT/UPDATE)
UPDATE "tasks" SET "is_complete"= (NOT "is_complete") WHERE "id"=1;

