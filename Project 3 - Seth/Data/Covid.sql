Drop Table USCases
Drop Table USVaccine


CREATE TABLE USCases(
	day date NOT NULL,
	geoid varchar (150) NOT NULL,
	cases varchar (150) NOT NULL,
	cases_avg varchar (150) NOT NULL,
	cases_avg_per_100k varchar (150) NOT NULL,
	deaths varchar (150) NOT NULL,
	deaths_avg varchar (150) NOT NULL,
	deaths_avg_per_100k varchar (150) NOT NULL,
	primary key (day)
);


Create Table USVaccine(
	day date NOT NULL,
	total_vaccinations varchar (1500) NOT NULL,
	people_vaccinated varchar (1500) NOT NULL,
	people_fully_vaccinated varchar (1500) NOT NULL,
	primary key (day)
);

SELECT 
 *
  FROM USCases
   JOIN USVaccine
    USING (day);


Select * from USCases
Select * from USVaccine


