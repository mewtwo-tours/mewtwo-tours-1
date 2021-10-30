CREATE TABLE "listings" (
	"id" uuid NOT NULL UNIQUE DEFAULT uuid_generate_v1 (),
	"title" varchar,
	"description" varchar,
	"street_address" varchar,
	"city" varchar,
	"state" varchar,
	"latitude" decimal,
	"longitude" decimal,
	"upvote" int NOT NULL DEFAULT '0',
	"downvote" int NOT NULL DEFAULT '0',
	"posted_by" uuid,
	CONSTRAINT "listings_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "images" (
	"id" uuid NOT NULL UNIQUE DEFAULT uuid_generate_v1 (),
	"key" varchar NOT NULL,
	"description" varchar,
	"listing_id" uuid NOT NULL,
	CONSTRAINT "images_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "comments" (
	"id" uuid NOT NULL UNIQUE DEFAULT uuid_generate_v1 (),
	"sentby_id" uuid NOT NULL,
	"listing_id" uuid NOT NULL,
	"message" varchar NOT NULL,
	"timestamp" TIMESTAMP NOT NULL,
	CONSTRAINT "comments_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "users" (
	"id" uuid NOT NULL UNIQUE DEFAULT uuid_generate_v1 (),
	"name" varchar,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "listings" ADD CONSTRAINT "listings_fk0" FOREIGN KEY ("posted_by") REFERENCES "users"("id");
ALTER TABLE "images" ADD CONSTRAINT "images_fk0" FOREIGN KEY ("listing_id") REFERENCES "listings"("id");
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk0" FOREIGN KEY ("sentby_id") REFERENCES "users"("id");
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk1" FOREIGN KEY ("listing_id") REFERENCES "listings"("id");






