CREATE TABLE Listings (
	id uuid NOT NULL UNIQUE DEFAULT uuid_generate_v1 (),
	title varchar,
	description varchar,
	street_address varchar,
	city varchar,
	state varchar,
	lattitude varchar,
	longitude varchar,
	upvote int NOT NULL DEFAULT '0',
	downvote int NOT NULL DEFAULT '0',
	posted_by varchar,
	CONSTRAINT Listings_pk PRIMARY KEY (id)
) WITH (
  OIDS=FALSE
);



CREATE TABLE Images (
	id uuid NOT NULL UNIQUE DEFAULT uuid_generate_v1 (),
	url varchar NOT NULL,
	description varchar,
	listing_id uuid NOT NULL,
	CONSTRAINT Images_pk PRIMARY KEY (id)
) WITH (
  OIDS=FALSE
);



CREATE TABLE Comments (
	id uuid NOT NULL UNIQUE DEFAULT uuid_generate_v1 (),
	sentby_id uuid NOT NULL,
	listing_id uuid NOT NULL,
	message varchar NOT NULL,
	timestamp TIMESTAMP NOT NULL,
	CONSTRAINT Comments_pk PRIMARY KEY (id)
) WITH (
  OIDS=FALSE
);



CREATE TABLE Users (
	id uuid NOT NULL UNIQUE DEFAULT uuid_generate_v1 (),
	name varchar,
	email varchar NOT NULL,
	password varchar NOT NULL,
	CONSTRAINT Users_pk PRIMARY KEY (id)
) WITH (
  OIDS=FALSE
);



ALTER TABLE Listings ADD CONSTRAINT Listings_fk0 FOREIGN KEY (posted_by) REFERENCES Users(id);

ALTER TABLE Images ADD CONSTRAINT Images_fk0 FOREIGN KEY (listing_id) REFERENCES Listings(id);

ALTER TABLE Comments ADD CONSTRAINT Comments_fk0 FOREIGN KEY (sentby_id) REFERENCES Users(id);
ALTER TABLE Comments ADD CONSTRAINT Comments_fk1 FOREIGN KEY (listing_id) REFERENCES Listings(id);






