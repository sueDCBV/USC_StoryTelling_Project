CREATE DEFINER=`root`@`%` PROCEDURE `Cause_Of_Gun_Deaths`()
begin
	SELECT * FROM
	(SELECT year(date),
	CASE WHEN inc LIKE '%mass shooting%' OR inc like '%Mass Murder%' THEN 'Mass_Shooting'
		 WHEN inc LIKE '%drive-by%' THEN 'Drive-By'
		 WHEN inc LIKE '%home invasion%' THEN 'Home_Invasion'
		 WHEN inc LIKE '%Murder/Suicide%' THEN 'Murder_Suicide'
		 WHEN inc LIKE '%School%' THEN 'School_Shooting'
		 WHEN inc LIKE '%Armed robbery%' THEN 'Armed_Robbery'
		 WHEN inc LIKE '%Officer involvement%' THEN 'Officer_Involvement'
		 WHEN inc LIKE '%accident%' THEN 'Accident'
		 WHEN inc LIKE '%defensive%' THEN 'Defensive'
		 WHEN inc LIKE 'Suicide%' THEN 'Suicide'
		 ELSE 'Other'
		 END AS Cause_of_Death,
		 state, city_or_county,
		 lat,lon,
		 SUM(deaths) as Number_of_Deaths
	FROM (SELECT date,incident_characteristics as inc, n_killed as deaths,
	gundata.state as state ,city_or_county,latitude as lat,longitude as lon from gundata) as sub
    WHERE state = 'California'
	GROUP BY state, city_or_county,
		 year(date),
		 CASE WHEN inc LIKE '%mass shooting%' OR inc like '%Mass Murder%' THEN 'Mass_Shooting'
		 WHEN inc LIKE '%drive-by%' THEN 'Drive-By'
		 WHEN inc LIKE '%home invasion%' THEN 'Home_Invasion'
		 WHEN inc LIKE '%Murder/Suicide%' THEN 'Murder_Suicide'
		 WHEN inc LIKE '%School%' THEN 'School_Shooting'
		 WHEN inc LIKE '%Armed robbery%' THEN 'Armed_Robbery'
		 WHEN inc LIKE '%Officer involvement%' THEN 'Officer_Involvement'
		 WHEN inc LIKE '%accident%' THEN 'Accident'
		 WHEN inc LIKE '%defensive%' THEN 'Defensive'
		 WHEN inc LIKE 'Suicide%' THEN 'Suicide'
		 ELSE 'Other'
		 END) as sub2;
     END