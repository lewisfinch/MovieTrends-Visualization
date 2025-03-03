import define1 from "./a33468b95d0b15b0@817.js";
import define2 from "./606721ba06ae51d6@563.js";

function _1(md){return(
md`# Final Report: Group 17`
)}

function _2(md){return(
md`## Exploring Movie Trends and Relationship Between Movie Preferences and Personal Attributes`
)}

function _3(md){return(
md`Yicheng Zhai (yz11708) 
Xinying Wang (xw3738)`
)}

function _4(md){return(
md`## Introduction`
)}

function _5(md){return(
md`In recent years, with the advancement and progress in artificial intelligence and machine learning, Personalized Recommendation Systems(PRS) have become a core component of modern digital platforms, helping users quickly discover content tailored to their unique preferences. While recommendation systems have significantly enhanced user experiences in fields such as e-commerce, streaming services, and social media, the movie recommendation domain presents unique challenges. Unlike these domains, movie recommendation systems experience lower feedback frequency and a smaller margin for error. 

On platforms like e-commerce or short video services, users can provide feedback (e.g., likes or skips) after only a few seconds of interaction with an item or video. In contrast, movies require users to spend hours watching before offering feedback, and incorrect recommendations result in high time costs for users. This makes recommendation systems in the movie domain particularly challenging. Therefore, the lack of sufficient training samples necessitates a deeper exploration of users' personal attributes (such as occupation, age, and gender) and mainstream movie trends to improve the quality of user modeling, especially during the early stages of user interaction.

In this project, our goal is to analyze how mainstream movie trends have evolved over time, explore the current cinematic trends, and evaluate whether these trends can help narrow the scope of recommendations in the absence of sufficient data. Furthermore, we aim to investigate whether there is a relationship between users' personal attributes (such as gender, age, occupation, and region) and their movie preferences, and assess whether these attributes can serve as significant features for training recommendation models. 

This project can not only contribute to enhancing recommendation systems but also help the movie industry and streaming services more intuitively focus on industry trends and the interests of both existing and potential audiences, leading to the creation of more engaging and inclusive content.`
)}

function _6(md){return(
md`## Dataset`
)}

function _7(md){return(
md`We will use a dataset from [***MovieLens***](https://movielens.org/), a web-based recommender system created by GroupLens Research at the University of Minnesota, where users can rate the movies they've watched and receive personalized movie recommendations. The original dataset can be found here: https://grouplens.org/datasets/movielens/

The original dataset contains approximately 33,000,000 ratings and 2,000,000 tag applications across 86,000 movies, contributed by 330,975 users, along with detailed information about each movie and user.

The subset we have taken consists of **3** CSV subsets(<u>***movies***</u>, <u>***users***</u>, <u>***ratings***</u>), containing **100,000 ratings** for **9,000 movies**, contributed by **600 users**.

- The **movies** dataset includes 9,000 movie <u>titles</u>, <u>release years</u>, and <u>genres</u>.
- The **users** dataset contains 600 user <u>age</u>, <u>gender</u>, <u>occupation</u>, and <u>zipcode</u>.
- The **ratings** dataset contains each user's <u>rating</u> (*on a scale from 1 to 5*)  for the movies they have watched.`
)}

function _8(md){return(
md`## Questions`
)}

function _9(md){return(
md`### Question 1:`
)}

function _10(md){return(
md`### How have movie trends changed over time? What notable changes and trends have emerged?`
)}

function _11(md){return(
md`We quantify trends using the total sum of ratings, considering both popularity and viewer evaluations. To better observe the impact of time, we divide the timeline into 10-year intervals. Additionally, we aim to analyze the trends of each time interval by examining the most popular movies and genres. A Lollipop chart is used for visualization. Users can select time intervals from a dropdown menu and choose either movies or genres for the x-axis, with the total sum of ratings on the y-axis to visualize the trends.`
)}

function _decades(Inputs,decadeColumns){return(
Inputs.select(decadeColumns, {value: '2010-2020', label: "Select Decades:"})
)}

function _type(Inputs,typeColumns){return(
Inputs.radio(typeColumns, {value: 'Genres', label: 'X-axis'})
)}

function _14(d3,width,heightQ1,type,cleanedMovieTotalRatings,sortedGenreTotalRatings,movieScale,ratingScaleQ1,marginQ1,yAxisRat,xAxisRat)
{
  const svg = d3.create('svg')
      .attr('width', width)
      .attr('height', heightQ1);

  const dataToUse = (type === "Movies") ? cleanedMovieTotalRatings : sortedGenreTotalRatings;
  
  svg.append('g')
    .selectAll('line')
    .data(dataToUse)
    .join('line')
      .attr('x1', d => (type === "Movies" ? movieScale(d.title) : movieScale(d.genre)))
      .attr('x2', d => (type === "Movies" ? movieScale(d.title) : movieScale(d.genre)))
      .attr('y1', d => ratingScaleQ1(d.totalRating))
      .attr('y2', d => heightQ1 - marginQ1.bottom)
      .attr('stroke', 'lightgray');
  
  svg.append('g')
    .selectAll('circle')
    .data(dataToUse)
    .join('circle')
      .attr('cx', d => (type === "Movies" ? movieScale(d.title) : movieScale(d.genre)))
      .attr('cy', d => ratingScaleQ1(d.totalRating))
      .attr('r', 5)
      .attr('fill', 'orange');
  
  svg.append('g')
      .attr('transform', `translate(${marginQ1.left})`)
      .call(yAxisRat)
      .append('text')
        .attr('text-anchor', 'start')
        .attr('dominant-baseline', 'middle')
        .attr('fill', 'black')
        .attr('x', 6)
        .attr('y', 20)
        .text('Total Rating');
  
  svg.append('g')
      .attr('transform', `translate(0,${heightQ1 - marginQ1.bottom})`)
      .call(xAxisRat)
      .selectAll('text')
      .style('text-anchor', 'start')
      .attr('transform', 'rotate(30)')
      .attr('font-size', "10px"); 
  
  return svg.node();
}


function _15(md){return(
md`***Drama, Comedy, Action***<br>
Since the 1920s, Drama movies have consistently remained the most popular genre, holding the top spot in terms of popularity. Comedy movies followed closely, maintaining their position within the top two starting from the 1960s. Finally, in the 1970s, Action movies began securing a spot in the top three. Since then, the top three movie genres have remained unchanged over the past 50 years. Based on this, we can say that Drama, Comedy, and Action movies are the dominant themes in modern cinema, which means the majority of people love these movies.

***Sci-Fi, Adventure, Fantasy***<br>
Around the 1960s, the space race between the United States and the Soviet Union inspired humanity's imagination of space, leading to the creation of excellent Sci-Fi movies such as *Star Wars*, *Alien*, and *2001: A Space Odyssey*. These works fueled the rapid rise of Sci-Fi movies over the past 50 years. With the advancement of movie special effects technology around the 2000s, masterpieces like the Marvel and DC series, *Inception*, and *Interstellar* emerged, driving another surge in the popularity of Sci-Fi movies. Today, Sci-Fi holds a position second only to Drama, Comedy, and Action movies. Additionally, Adventure and Fantasy genres have also benefited from this growth, gaining more space for development.

***IMAX, Animation, Documentary***<br>
Technological advancements have not been limited to movie special effects. IMAX movies, which entered the public's view around the 1990s, have risen to prominence today, with a superior viewing experience becoming a key consideration for audiences. Documentaries, which ranked last before the millennium, have also gradually moved out of the bottom tier over the past two decades. This shift can be attributed to two factors: improvements in filming equipment that have enhanced the quality of documentaries, and the combination of widespread education and the rapid pace of modern development, which has driven people to actively seek out extracurricular knowledge. However, according to current data, documentaries remain a niche preference.

Returning to the impact of technological progress, Animation has also been one of the beneficiaries. The trajectory of Animation movies has evolved from the early days of roughly drawn musical movies to today’s high-quality 3D animated movies and technologically advanced animes. At the same time, Animation has gradually moved beyond its traditional focus on children, expanding its appeal to audiences of all ages. This shift has led to a sharp rise in its status in recent years.

***Western, Musical, Film-Noir***<br>
In the 1930s, the musical genre, popularized by animated movies like *Snow White*, *Pinocchio*, and *Fantasia*, gradually became a niche interest as mainstream preferences in cinema shifted. Similarly, the Film-Noir trend, sparked by masterpieces such as *Casablanca* and *Citizen Kane* in the 1940s, was eventually phased out with advancements in cinematography. Additionally, Western movies, which enjoyed a brief surge in popularity around the 1960s, quickly faded back into obscurity after their short-lived trend.

***Crime, Thriller, Mystery***<br>
Crime, Thriller, and Mystery movies were relatively lukewarm in the early years, but around the 1950s, the works of Alfred Hitchcock played a pivotal role in advancing the filming techniques of Thriller and Mystery movies, lifting both genres from their low points. Hitchcock's influence, particularly in Thriller movies, remains evident today, as his techniques are frequently borrowed in various movies. Following this, the societal upheavals of the 1970s, along with masterpieces like The *Godfather* that inherited the essence of Film-Noir, helped to carve out a niche for Crime movies. Today, Thriller movies have become a mainstream genre, second only to the dominant genres, while Crime and Mystery movies have maintained their own foothold in the market.

***War, Romance***<br>
War and Romance movies gained widespread attention after World War I and continued to receive significant focus during World War II and the Vietnam War. The theme of love during wartime was a major draw for audiences of the time. However, as time passed, War movies gradually faded from the public eye, while the longing for love remained, allowing Romance movies to maintain a steady market.

***Children, Horror***<br>
Children's and Horror movies have maintained a steady level of popularity. We believe the primary reason is that their audiences are highly fixed. Children's movies mostly cater to children, while Horror movies require viewers with strong psychological resilience. Aside from the unique appeal of early black-and-white Horror movies, which added a distinct charm to the genre, Children's and Horror movies have struggled to become mainstream, even during eras when outstanding works in these genres were frequent.`
)}

function _16(md){return(
md`### Question 2:`
)}

function _17(md){return(
md`### Are there significant differences in movie preferences based on gender?`
)}

function _18(md){return(
md`To observe the impact of gender on users' movie preferences, we used bar charts to depict the trends in movie preferences separately for male and female groups. Similar to the previous question, we quantified trends using the sum of ratings. To highlight the differences between genders more prominently, we combined the two bar charts for easier comparison, using different colors to represent each gender.`
)}

function _genderChosen(Inputs,genderList){return(
Inputs.select(genderList, {value: "Male & Female", label: "Select Gender:"})
)}

function _20(Swatches,d3){return(
Swatches(d3.scaleOrdinal(["Male", "Female", ], ["#5983D9", "#D959A8"]))
)}

function _21(d3,width,height,sortedGenreAverages,genreScaleBand,genderChosen,ratingScale,genderColorMap,othersortedGenreAverages,margin,yAxis)
{
  const svg = d3.create('svg')
      .attr('width', width)
      .attr('height', height);

  svg.append('g')
    .selectAll('rect')
    .data(sortedGenreAverages)
    .join('rect')
      .attr('x', d => genreScaleBand(d.genre) + genreScaleBand.bandwidth() / 4)
      .attr('width', d => genderChosen !== "Male & Female" ? genreScaleBand.bandwidth() / 2: genreScaleBand.bandwidth() / 4)
      .attr('y', d => ratingScale(d.averageRating))
      .attr('height', d => ratingScale(0) - ratingScale(d.averageRating))
      .attr('fill', genderColorMap[genderChosen]);

    svg.append('g')
    .selectAll('rect')
    .data(othersortedGenreAverages)
    .join('rect')
      .attr('x', d => genreScaleBand(d.genre) + 2 * genreScaleBand.bandwidth() / 4)
      .attr('width', d => genderChosen !== "Male & Female" ? genreScaleBand.bandwidth() / 2: genreScaleBand.bandwidth() / 4)
      .attr('y', d => ratingScale(d.averageRating))
      .attr('height', d => ratingScale(0) - ratingScale(d.averageRating))
      .attr('fill', genderColorMap['Female']);

  svg.append('g')
      .attr('transform', `translate(${margin.left})`)
      .call(yAxis);

  svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(genreScaleBand))
    .append('text')
      .attr('fill', 'black')
      .attr('font-family', 'sans-serif')
      .attr('x', width / 2)
      .attr('y', 40)
      .text("Genres");

  svg.append('text')
    .attr('x', width / 3)
    .attr('y', margin.top / 2)
    .text(`Ratings by Movie Genre and Gender Comparison`);
  
  return svg.node();
}


function _22(md){return(
md`Although there is a significant gender imbalance in the user base, we can still observe that the trends between the two genders are remarkably similar across all movie genres (the ranking of preferred movie genres is highly consistent for both genders). Therefore, we conclude that gender does not have a significant impact on movie preferences and holds limited value as a factor for predicting users' movie preferences.`
)}

function _23(md){return(
md`### Question 3`
)}

function _24(md){return(
md`### How are users' movie preferences influenced by their professional backgrounds?`
)}

function _25(md){return(
md`To examine the impact of occupation on users' movie preferences, we chose to use a matrix chart to illustrate the extent to which different occupations engage with various movie genres. Occupations are represented as rows, while genres are represented as columns. Unlike the previous questions, we quantified engagement by calculating the proportion of the total ratings given by an occupation to a specific genre relative to that occupation's overall ratings. The proportions are visually represented using varying shades of color to indicate the corresponding values.`
)}

function _26(legend,color){return(
legend({ color, title: "Rating Propotion(%)", tickFormat: ".2f"})
)}

function _27(d3,width,height2,yAxis2,xAxis,margin2,x,y,sortedGenres,sortedOccupations,result,color)
{
  const svg = d3.create('svg')
      .attr('width', width)
      .attr('height', height2);

  svg.append("g").call(yAxis2);
  svg.append("g").call(xAxis);

  svg.append('text')
    .attr('y', margin2.top / 4)
    .attr('x', margin2.left / 8)
    .text(`Rating Proportions for Movie Genres Across Occupations`);
    
  const background = svg.append('g');

  background.append('rect')
      .attr('x', margin2.left)
      .attr('y', margin2.top)
      .attr('width', width - margin2.left - margin2.right)
      .attr('height', height2 - margin2.top - margin2.bottom)
      .attr('fill', '#eeeeee');
  
  const xPaddingSize = x.step() * x.paddingInner();
  const yPaddingSize = y.step() * y.paddingInner();

  svg.append("text")
      .attr('y', margin2.top / 3)
      .attr('x', width / 2)
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "hanging")
      .attr("font-size", "12px")
      .text("Genres");

  background.append('g')
    .selectAll('line')
    .data(sortedGenres.slice(1))
    .join('line')
      .attr('x1', d => x(d) - xPaddingSize / 2)
      .attr('x2', d => x(d) - xPaddingSize / 2)
      .attr('y1', margin2.top)
      .attr('y2', height2 - margin2.bottom)
      .attr('stroke-width', xPaddingSize)
      .attr('stroke', 'white');
  
  background.append('g')
    .selectAll('line')
    .data(sortedOccupations.slice(1))
    .join('line')
      .attr('y1', d => y(d) - yPaddingSize / 2)
      .attr('y2', d => y(d) - yPaddingSize / 2)
      .attr('x1', margin2.left)
      .attr('x2', width - margin2.right)
      .attr('stroke-width', yPaddingSize)
      .attr('stroke', 'white');

  svg.append('g')
    .selectAll('rect')
    .data(result)
    .join('rect')
      .attr('x', d => x(d.genre))
      .attr('y', d => y(d.occupation))
      .attr('width', x.bandwidth())
      .attr('height', y.bandwidth())
      .attr('fill', d => color(d.avgrating));
  
  return svg.node();
}


function _28(md){return(
md`Although the matrix still shows a clear ranking of movie genre audiences, a closer look reveals subtle differences in preferences across occupations. Drama, Comedy, and Action movies still hold a dominant position, but it's evident that doctors show slightly less interest in the widely loved Comedy genre. Instead, they have a greater preference for Thriller, Horror, and War movies, which may be linked to the strong psychological resilience required in their profession. Shifting focus to more outliers, we see a pattern similar to the relationship between documentaries and education level discussed in the first question. Doctors, lawyers, and managers, as highly educated professionals, form the primary audience for documentaries in this data. Homemakers, on the other hand, rate Children's and Animation movies highly, likely due to spending time with their children, and therefore provide fewer ratings for movies like War and Mystery, which are not suitable for young children. Since this training set only includes 600 users, the details we can observe are limited. However, we can confirm that occupation does have an influence on movie preferences. Occupation could be an important feature for recommending movies, especially in cases where there is insufficient user feedback.`
)}

function _29(md){return(
md`### Question 4`
)}

function _30(md){return(
md`### How do movie preferences vary across different age groups?`
)}

function _31(md){return(
md`To examine the impact of age on user preferences, we chose to use a radar chart for comparison. The polygonal visual effect is used to show the level of engagement each age group has with various genres. Users can select a specific age group for observation or view all age groups simultaneously. Different colors are used to represent the ratings from different age groups. Similar to the previous two questions, we quantify the trends using the total ratings to measure the level of engagement.`
)}

function _ageChosen(Inputs,ageRanges){return(
Inputs.select(ageRanges, {value: "All", label: "Select Age:"})
)}

function _33(swatches,userColor){return(
swatches({ color: userColor })
)}

function _radarPlot(ageRanges,userTotalRatings,top20Genres,d3,userColor)
{

  const margins = 40
  const width = 800,
        height = 800,
        radius = Math.min(width, height) / 2 - margins*2;

  const ageRangeData = ageRanges.map(range => {
    const rangeRatings = userTotalRatings.filter(d => {
      if (range === "All") return true; 
      const [minAge, maxAge] = range.split("-").map(Number);
      return d.age >= minAge && d.age < maxAge;
    });
    const avgRatings = {};
    top20Genres.forEach(genre => {
      const genreRatings = rangeRatings.filter(d => d.genre === genre);
      avgRatings[genre] = d3.mean(genreRatings, d => d.rating) || 0; 
    });
    return { ...avgRatings, ageRange: range };
  });

const globalMax = d3.max(ageRanges.filter(range => range !== "All").map(range => {
  const rangeRatings = userTotalRatings.filter(d => {
    if (range === "All") return false; 
    const [minAge, maxAge] = range.split("-").map(Number);
    return d.age >= minAge && d.age < maxAge;
  });

  const totalRatings = {};
  top20Genres.forEach(genre => {
    const genreRatings = rangeRatings.filter(d => d.genre === genre);
    totalRatings[genre] = genreRatings.reduce((sum, d) => sum + d.rating, 0);
  });

  return d3.max(top20Genres.map(genre => totalRatings[genre]));
}));

  
  const angleSlice = (2 * Math.PI) / top20Genres.length;
  const rScale = d3.scaleLinear().domain([0, globalMax]).range([0, radius]);

  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    
  const radarGroup = svg.append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  const gridLevels = 5;
  for (let level = 0; level < gridLevels; level++) {
    const levelRadius = (level + 1) * radius / gridLevels;
    radarGroup.append("circle")
      .attr("fill", "none")
      .attr("stroke", "#ddd")
      .attr("stroke-dasharray", "2,2")
      .attr("r", levelRadius);

    const value = rScale.invert(levelRadius).toFixed(1);
    radarGroup.append("text")
      .attr("y", -levelRadius - 5)
      .attr("text-anchor", "middle")
      .attr("font-size", "10px")
      .attr("fill", "gray")
      .text(value);
  }

  top20Genres.forEach((genre, i) => {
    const angle = angleSlice * i - Math.PI / 2;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);


    radarGroup.append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", x)
      .attr("y2", y)
      .attr("stroke", "gray")
      .attr("stroke-width", 1);
    
    radarGroup.append("text")
      .attr("x", x * 1.15)
      .attr("y", y * 1.15)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .text(genre);
  });

  const radarLine = d3.lineRadial()
    .radius((d, i) => rScale(d[1]))
    .angle((d, i) => angleSlice * i);
ageRanges.forEach(range => {
  if (range === "All") return;  

  const rangeRatings = userTotalRatings.filter(d => {
    if (range === "All") return true; 
    const [minAge, maxAge] = range.split("-").map(Number);
    return d.age >= minAge && d.age < maxAge;
  });

  const totalRatings = {};
  top20Genres.forEach(genre => {
    const genreRatings = rangeRatings.filter(d => d.genre === genre);
    totalRatings[genre] = genreRatings.reduce((sum, d) => sum + d.rating, 0); 
  });

  const pathData = top20Genres.map(genre => [genre, totalRatings[genre]]);
  pathData.push(pathData[0]);  
  
  radarGroup.append("path")
    .datum(pathData)
    .attr("fill", userColor(range))
    .attr("fill-opacity", 0.1)
    .attr("stroke", userColor(range))
    .attr("stroke-width", 2)
    .attr("d", radarLine);
});

  const legend = radarGroup.append("g")
    .attr("transform", `translate(${radius + 15}, -${height / 2 - 20})`);

  ageRanges.forEach((range, i) => {
    legend.append("circle")
      .attr("cx", 0)
      .attr("cy", i * 20)
      .attr("r", 5)
      .attr("fill", userColor(range));
    legend.append("text")
      .attr("x", 10)
      .attr("y", i * 20)
      .attr("dy", ".35em")
      .style("font-size", "12px")
      .text(range);
  });

  return svg.node();
}


function _35(md){return(
md`In this chart, the 0-10 and 70-80 age groups only have one sample each, so we disregard them. For the other age groups, the movie preferences follow almost identical patterns, which can be clearly seen in the "All ages" section. Excluding the sample size differences, the shape of the polygons shows almost the same proportional distortion. We found that different age groups gave similar ratings to Children movies, which are targeted at a specific age group. This suggests that users across various age groups might rate movies they watched at different stages of their lives. However, the movies they liked at the time, such as those in the Children genre, may not necessarily align with their current preferences. Therefore, it is still unclear whether age can be considered an effective feature for assessing preferences.`
)}

function _36(md){return(
md`### Question 5`
)}

function _37(md){return(
md`### Is there any relationship between users' movie preferences and the place they live?`
)}

function _38(md){return(
md`To analyse the total number of ratings we have for each state and the top 5 movie genres mostly liked, we used an interactive map. In the chart, the color of each state transitions from dark to light, representing the number of users who participated in rating, ranging from high to low. It is evident from the chart that California, New York, and Minnesota have the highest number of user ratings. This, to some extent, reflects the population size of each state. Minnesota, however, is an exception because this dataset originates from Minnesota, which explains why the number of ratings from this state ranks among the top three. Several states with relatively smaller populations, such as Massachusetts, Tennessee, and Utah, have demonstrated high activity in movie ratings, with a significant number of users participating in the rating.`
)}

function _39(md){return(
md`In addition, from the perspective of movie genres, we can see that Drama, Comedy, and Action are still the top three most popular genres in most states. However, in some states, such as Oregon, relatively niche genres like Sci-Fi and Adventure rank very high and are more popular. The reason could be intriguing. The popularity of niche genres like Sci-Fi and Adventure in Oregon could be due to the state's diverse and creative population, which tends to enjoy imaginative and alternative forms of entertainment. Oregon’s beautiful natural landscapes may also influence a preference for movies with themes of exploration and adventure. Additionally, the presence of universities and a growing tech industry in Oregon may foster an interest in futuristic and tech-related films. The state's younger, more open-minded residents might also be more drawn to these genres, which align with hobbies like gaming and science fiction literature.`
)}

function _40(md){return(
md`Another striking point in the graph is the absence of data for South Dakota. This could be influenced by economic and ethnic factors. South Dakota, home to several Native American tribes like the Lakota and other Sioux tribes, has a relatively high poverty rate and limited access to online resources. The state's economy primarily relies on farming, animal husbandry, and mining, contributing to slower economic growth and lower internet adoption rates. Additionally, Native American communities often prioritize community life and traditional activities over online engagement, which may result in underrepresentation in the dataset.`
)}

function _41(Legend,d3){return(
Legend(d3.scaleQuantize([1, 9000], d3.schemeOranges[9]), {
  title: "Number of Users",
  tickFormat: ".0f"
})
)}

function _42(d3,usaWidth,usaMargin,usaHeight,usaGeo,usaPath,groupedByState,colorScale,topGenresByState,getStateFromZip)
{
  const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("opacity", 0)
    .style("background-color", "rgba(0, 0, 0, 0.7)")
    .style("color", "#fff")
    .style("padding", "10px")
    .style("border-radius", "5px")
    .style("font-size", "14px");

  const svg = d3.create("svg")
    .attr("width", usaWidth + usaMargin.left + usaMargin.right)
    .attr("height", usaHeight + usaMargin.top + usaMargin.bottom);
  
  const g = svg.append("g")
    .attr("transform", `translate(${usaMargin.left}, ${usaMargin.top})`);

  g.append("text")
    .attr("x", 1 * usaWidth / 2)
    .attr("y", -usaMargin.top / 2)
    .attr("text-anchor", "middle")
    .attr("font-size", "20px")
    .attr("font-weight", "bold")
    .text("Total Movie Ratings by State with Top 5 Genres Liked");
  
  g.selectAll("path")
  .data(usaGeo.features)
  .join("path")
  .attr("d", usaPath)
  .attr("fill", d => {
    const stateName = d.properties.NAME;
    const stateData = groupedByState.get(stateName);
    if (stateData) {
      const totalRating = stateData.length;
      return colorScale(totalRating);
    }
    return "#eeeeee"; 
  })
  .attr("stroke", "#333")
  .attr("stroke-width", 0.5)
  .on("mouseover", function(event, d) {
    const stateName = d.properties.NAME;

    const stateTopGenres = topGenresByState.find(item => getStateFromZip(item.state) === stateName);
    const genresText = stateTopGenres ? stateTopGenres.topGenres.map(genre => `${genre.genre}: ${genre.totalRating.toFixed(2)}`).join("<br>") : "No data available";

    d3.select(this).transition()
      .duration(50)
      .attr('opacity', '.85');

    tooltip.transition()
      .duration(50)
      .style("opacity", 1);
    tooltip.html(`<strong>${stateName}</strong><br>${genresText}`)
      .style("left", (event.pageX + 10) + "px")
      .style("top", (event.pageY - 15) + "px");
  })
  .on("mouseout", function() {
    d3.select(this).transition()
      .duration(50)
      .attr('opacity', '1');
    
    tooltip.transition()
      .duration(50)
      .style("opacity", 0);
  });

  return svg.node();

}


function _43(md){return(
md`## Conclusion`
)}

function _44(md){return(
md`### Movies Trends:`
)}

function _45(md){return(
md`We analyzed nearly 100 years of movie trends and identified key patterns in modern cinema. Drama, Comedy, and Action movies have consistently led the way, remaining in the top three for the past 50 years due to their broad appeal. Sci-Fi, IMAX, and Animation movies have benefitted from technological advancements, rapidly rising in popularity and closing in on the top three. These improvements in special effects and projection technologies have also enhanced Adventure and Fantasy movies. Documentaries, once at the bottom, have gained traction in recent years due to better filming equipment and increased education levels.

On the other hand, genres like Western, Musical, and Film-Noir have gradually faded, with only a small group of enthusiasts still following them. Crime, Thriller, and Mystery genres, once less popular, have found a market thanks to influential works and pioneers. War and Romance movies, which thrived during wartime, have since split in peacetime, with Romance continuing to flourish while War movies have receded from the public eye. Children's and Horror movies maintain steady interest due to their specific audiences but have remained niche and not entered the mainstream. These trends provide a clear template for recommendation systems, especially when initial user preferences are not well understood.`
)}

function _46(md){return(
md`### User Attributes:`
)}

function _47(md){return(
md`We analyzed the impact of gender, occupation, age, and region on users' movie preferences:

1. We found that the total rating rankings for all movie genres are virtually identical between male and female users. This indicates that gender has little to no impact on movie preferences, even though in daily life, we may perceive significant differences in preferences between the genders.

2. We discovered that occupation is the most influential factor in movie preferences among the characteristics we investigated. The dominance of Drama, Comedy, and Action movies was broken here for the first time. A user's occupation largely reflects their thought patterns and daily hobbies, which is why movie preferences show clear differences between occupations. We believe that with more data, further details can be explored. Occupation could be an effective feature for assessing users' movie preferences.

3. We were unable to identify a significant impact of age on movie preferences. Given that the movies rated by users could have been watched at any age, the overall pattern is almost identical. Additionally, we couldn't track the specific age at which each movie was watched. Therefore, whether age can be considered an effective feature for evaluating preferences remains debatable.

4. We believe that region could have some impact on user preferences, possibly due to factors like local economic conditions, natural environments, and local industries (e.g., In regions with developed agriculture and regions with advanced high-tech industries, users' education levels and occupations can differ significantly). The rankings of total genre ratings show significant variations across many states, with some states having no ratings at all. We believe this warrants further exploration, and a deeper investigation into each region could help assess whether geographic factors shape unique viewing preferences.`
)}

function _48(md){return(
md`##  Appendix`
)}

function _49(md){return(
md`### Dataset:`
)}

function _userCsvUrl(){return(
"https://docs.google.com/spreadsheets/d/1MhrKm5iwrOKny2LgOHrNqA49x7noeaAjl3mEw_Nvjsw/gviz/tq?tqx=out:csv"
)}

function _movieCsvUrl(){return(
"https://docs.google.com/spreadsheets/d/170ypx1aq9ZFYRkQ0_IEyrsvfYxjqTaJbMfZa9FWTaL0/gviz/tq?tqx=out:csv"
)}

function _ratingCsvUrl(){return(
"https://docs.google.com/spreadsheets/d/1IFKnVmr7b8EH9Mapx3jtZiwKdPGU4G7ihLW1UNJAVw0/gviz/tq?tqx=out:csv"
)}

async function _userdata(d3,userCsvUrl)
{
  const data = await d3.csv(userCsvUrl, row => ({
    userId: +row.userId,
    age: +row.age,
    gender: row.gender,
    occupation: row.occupation,
    zipcode: +row.zipcode
  }));
  
  data.columns = Object.keys(data[0]);
  
  return data;
}


async function _moviedata(d3,movieCsvUrl)
{
  const data = await d3.csv(movieCsvUrl, row => ({
    movieId: +row.movieId,
    title: row.title,
    genres: row.genres.split('|')
  }));
  
  data.columns = Object.keys(data[0]);
  
  return data;
}


async function _ratingdata(d3,ratingCsvUrl)
{
  const data = await d3.csv(ratingCsvUrl, row => ({
    userId: +row.userId,
    movieId: +row.movieId,
    rating: +row.rating
  }));
  
  data.columns = Object.keys(data[0]);
  
  return data;
}


function _56(md){return(
md`### Question 1:`
)}

function _YearUpdatedMovieData(moviedata){return(
moviedata.map(movie => {
  const year = movie.title.match(/\((\d{4})\)/) ? movie.title.match(/\((\d{4})\)/)[1] : null;
  return {
    ...movie,
    year: year
  };
})
)}

function _yearPeriod(decades){return(
decades.split('-').map(Number)
)}

function _filteredMovies(YearUpdatedMovieData,yearPeriod){return(
YearUpdatedMovieData.filter(movie => {
  const movieYear = parseInt(movie.year);
  return movieYear >= yearPeriod[0] && movieYear <= yearPeriod[1];
})
)}

function _filteredMovieIds(filteredMovies){return(
filteredMovies.map(movie => movie.movieId)
)}

function _movieRatingsMap(movieRatingsSum){return(
new Map(movieRatingsSum)
)}

function _genreRatings(filteredMovies,movieRatingsMap){return(
filteredMovies.flatMap(movie => {
  const movieId = movie.movieId;
  const genres = movie.genres;

  const rating = movieRatingsMap.get(movieId);

  if (!rating) return [];

  return genres.map(genre => ({ genre, totalRating: rating }));
})
)}

function _genreTotalRatings(genreRatings){return(
genreRatings
  .filter(item => item.genre !== "(no genres listed)")
  .reduce((acc, curr) => {
    const existing = acc.find(item => item.genre === curr.genre);
    if (existing) {
      existing.totalRating += curr.totalRating; 
    } else {
      acc.push({ genre: curr.genre, totalRating: curr.totalRating });  
    }
    return acc;
  }, [])
)}

function _movieRatingsSum(d3,ratingdata,filteredMovieIds){return(
d3.rollups(
  ratingdata.filter(d => filteredMovieIds.includes(d.movieId)),
  v => d3.sum(v, d => d.rating),
  d => d.movieId
)
)}

function _movieTotalRatings(d3,movieRatingsSum,moviedata){return(
d3.sort(
  movieRatingsSum, 
  ([, totalRating]) => -totalRating
)
.slice(0, 30)
.map(([movieId, totalRating]) => {
  const movie = moviedata.find(movie => movie.movieId === movieId);
  return {
    title: movie ? movie.title : "Unknown",
    totalRating: totalRating
  };
})
)}

function _sorteMovieTotalRatings(d3,movieTotalRatings){return(
d3.sort(movieTotalRatings, d => -d.totalRating)
)}

function _sortedGenreTotalRatings(d3,genreTotalRatings){return(
d3.sort(genreTotalRatings, d => -d.totalRating)
)}

function _cleanedMovieTotalRatings(sorteMovieTotalRatings){return(
sorteMovieTotalRatings.map(d => ({
  ...d,
  title: d.title.replace(/\s*\(.*?\)/g, '') 
}))
)}

function _maxRating(d3,type,cleanedMovieTotalRatings,sortedGenreTotalRatings){return(
d3.max(
  type === 'Movies' ? cleanedMovieTotalRatings : sortedGenreTotalRatings, 
  d => d.totalRating
)
)}

function _top30Movies(cleanedMovieTotalRatings){return(
cleanedMovieTotalRatings.map(d => d.title)
)}

function _top20Genres(sortedGenreTotalRatings){return(
sortedGenreTotalRatings.map(d => d.genre)
)}

function _heightQ1(){return(
500
)}

function _getMargins(){return(
function getMargins(type) {
  return type === "Genres"
    ? {top: 20, bottom: 50, left: 75, right: 150}
    : {top: 20, bottom: 190, left: 75, right: 150};
}
)}

function _marginQ1(getMargins,type){return(
getMargins(type)
)}

function _movieScaleBand(d3,type,top30Movies,top20Genres,marginQ1,width){return(
d3.scaleBand()
    .domain(type === "Movies" ? top30Movies : top20Genres)
    .range([marginQ1.left, width - marginQ1.right])
    .padding(0.2)
)}

function _movieScale(d3,type,top30Movies,top20Genres,marginQ1,width){return(
d3.scalePoint()
    .domain(type === "Movies" ? top30Movies : top20Genres)
    .range([marginQ1.left, width - marginQ1.right])
    .padding(0.2)
)}

function _ratingScaleQ1(d3,maxRating,heightQ1,marginQ1){return(
d3.scaleLinear()
    .domain([0, maxRating + (1 / 10 * maxRating)])
    .nice()
    .range([heightQ1 - marginQ1.bottom, marginQ1.top])
)}

function _xAxisRat(d3,movieScale){return(
d3.axisBottom(movieScale)
)}

function _yAxisRat(d3,ratingScaleQ1){return(
d3.axisLeft(ratingScaleQ1).tickFormat(d3.format('~s'))
)}

function _typeColumns(){return(
['Movies', 'Genres']
)}

function _decadeColumns(){return(
['1900-1910', '1910-1920', '1920-1930', '1930-1940','1940-1950', '1950-1960','1960-1970', '1970-1980','1980-1990', '1990-2000','2000-2010', '2010-2020']
)}

function _83(md){return(
md`### Question 2:`
)}

function _genderRatings(ratingdata,userdata,moviedata){return(
ratingdata.map(rating => {
    const user = userdata.find(u => u.userId === rating.userId);
    const gender = user ? user.gender : null;

    const movie = moviedata.find(m => m.movieId === rating.movieId);
    const title = movie.title;
    const genres = movie ? movie.genres : [];

    return {
        gender: gender,
        title: title,
        genres: genres,
        rating: rating.rating
    };
})
)}

function _genderList(){return(
["Male", "Female", "Male & Female"]
)}

function _genderMap(genderList){return(
genderList.reduce((acc, gender) => {
  if (gender === "Male") {
    acc[gender] = "M";
  } else if (gender === "Female") {
    acc[gender] = "F";
  } else if (gender === "Male & Female") {
    acc[gender] = "M";
  }
  return acc;
}, {})
)}

function _genderColorMap(genderList){return(
genderList.reduce((acc, gender) => {
  if (gender === "Male") {
    acc[gender] = '#5983D9';
  } else if (gender === "Female") {
    acc[gender] = '#D959A8';
  } else if (gender === "Male & Female") {
    acc[gender] = '#5983D9';
  }
  return acc;
}, {})
)}

function _height(){return(
400
)}

function _margin(){return(
{top: 30, bottom: 45, left: 75, right: 10}
)}

function _ratingScale(d3,maxRatingG,height,margin){return(
d3.scaleLinear()
    .domain([0, maxRatingG])
    .nice()
    .range([height - margin.bottom, margin.top])
)}

function _maxRatingG(genreAverages){return(
Math.max(...genreAverages.map(d => d.averageRating))
)}

function _yAxis(d3,ratingScale){return(
d3.axisLeft(ratingScale)
)}

function _filteredData(genderRatings){return(
genderRatings.flatMap(d => 
  d.genres
    .filter(genre => genre !== "(no genres listed)")
    .map(genre => ({ genre, rating: d.rating, gender: d.gender }))
)
)}

function _chosenGenderRatings(filteredData,genderMap,genderChosen){return(
filteredData
  .filter(d => d.gender === genderMap[genderChosen])
)}

function _otherRatings(filteredData,genderChosen,genderMap){return(
filteredData
  .filter(d => genderChosen === "Male & Female" ? d.gender === genderMap["Female"] : 0)
)}

function _genreMap(d3,chosenGenderRatings){return(
d3.rollup(
  chosenGenderRatings,
  v => ({ total: d3.sum(v, d => d.rating), count: v.length }),
  d => d.genre
)
)}

function _othergenreMap(d3,otherRatings){return(
d3.rollup(
  otherRatings,
  v => ({ total: d3.sum(v, d => d.rating), count: v.length }),
  d => d.genre
)
)}

function _genreAverages(genreMap){return(
Array.from(genreMap, ([genre, { total, count }]) => ({
  genre,
  averageRating: total
}))
)}

function _othergenreAverages(othergenreMap){return(
Array.from(othergenreMap, ([genre, { total, count }]) => ({
  genre,
  averageRating: total
}))
)}

function _sortedGenreAverages(genreAverages){return(
genreAverages.sort((a, b) => b.averageRating - a.averageRating)
)}

function _othersortedGenreAverages(othergenreAverages){return(
othergenreAverages.sort((a, b) => b.averageRating - a.averageRating)
)}

function _allGenresG(genderChosen,sortedGenreAverages,othergenreAverages){return(
genderChosen !== "Male & Female" 
  ? sortedGenreAverages.map(d => d.genre)
  : sortedGenreAverages
      .map(d => {
        const other = othergenreAverages.find(o => o.genre === d.genre);
        const difference = Math.abs(d.averageRating - (other ? other.averageRating : 0));
        return { genre: d.genre, difference: difference };
      })
      .sort((a, b) => b.difference - a.difference)
      .map(d => d.genre)
)}

function _genreScaleBand(d3,allGenresG,margin,width){return(
d3.scaleBand()
    .domain(allGenresG)
    .range([margin.left, width - margin.right])
    .padding(0.01)
)}

function _104(md){return(
md`### Question 3:`
)}

function _occupationRatings(ratingdata,userdata,moviedata){return(
ratingdata.map(rating => {
    const user = userdata.find(u => u.userId === rating.userId);
    const occupation = user ? user.occupation : null;

    const movie = moviedata.find(m => m.movieId === rating.movieId);
    const title = movie.title;
    const genres = movie ? movie.genres : [];

    return {
        occupation: occupation,
        title: title,
        genres: genres,
        rating: rating.rating
    };
})
)}

function _filteredData2(occupationRatings){return(
occupationRatings.flatMap(d =>
  d.genres
    .filter(genre => genre !== "(no genres listed)")
    .filter(genre => d.occupation !== "none") 
    .map(genre => ({ genre, rating: d.rating, occupation: d.occupation })) 
)
)}

function _nestedData(d3,filteredData2){return(
d3.group(filteredData2, d => d.occupation, d => d.genre)
)}

function _result(nestedData,d3){return(
[...nestedData].flatMap(([occupation, genres]) => {
  const totalRating = d3.sum([...genres.values()].flatMap(g => g.map(d => d.rating)));

  return [...genres].map(([genre, entries]) => {
    const genreRating = d3.sum(entries, d => d.rating);
    return {
      occupation,
      genre,
      // avgrating: genreRating.toFixed(4)
      avgrating: (genreRating / totalRating).toFixed(4) * 100
    };
  });
})
)}

function _occupationAvg(d3,filteredData2){return(
Array.from(
  d3.rollup(
    filteredData2,
    v => {
      const totalRating = d3.sum(v, d => d.rating); 
      const count = v.length;
      return { avgrating: totalRating / count }; 
    },
    d => d.occupation,
    d => d.genre   
  )
).flatMap(([occupation, genres]) =>
  Array.from(genres, ([genre, { avgrating }]) => ({
    occupation,
    genre,
    avgrating
  }))
)
)}

function _occupationAvgRatings(d3,result){return(
Array.from(
  d3.rollup(
    result,
    v => {
      const totalRating = d3.sum(v, d => d.avgrating);
      const count = v.length; 
      return totalRating / count; 
    },
    d => d.occupation 
  )
)
)}

function _genreAvgRatings(d3,result){return(
Array.from(
  d3.rollup(
    result,
    v => {
      const totalRating = d3.sum(v, d => d.avgrating);
      const count = v.length; 
      return totalRating / count; 
    },
    d => d.genre 
  )
)
)}

function _sortedOccupationsData(occupationAvgRatings){return(
occupationAvgRatings.sort((a, b) => b[1] - a[1])
)}

function _sortedGenresData(genreAvgRatings){return(
genreAvgRatings.sort((a, b) => b[1] - a[1])
)}

function _sortedOccupations(sortedOccupationsData){return(
sortedOccupationsData.map(([occupation, _]) => occupation)
)}

function _sortedGenres(sortedGenresData){return(
sortedGenresData.map(([genre, _]) => genre)
)}

function _height2(margin2){return(
500 + margin2.top + margin2.bottom
)}

function _margin2(){return(
{top: 50, right: 100, bottom: 50, left: 100}
)}

function _x(d3,sortedGenres,margin2,width){return(
d3.scaleBand()
      .domain(sortedGenres)
      .range([margin2.left, width - margin2.right])
      .paddingInner(0.1)
)}

function _y(d3,sortedOccupations,margin2,height2){return(
d3.scaleBand()
      .domain(sortedOccupations)
      .range([margin2.top, height2 - margin2.bottom])
      .paddingInner(0.1)
)}

function _xAxis(margin2,d3,x){return(
g => g
    .attr('transform', `translate(0,${margin2.top})`)
    .call(d3.axisTop(x).tickSize(0))
    .call(g => g.selectAll(".domain").remove())
    .selectAll(".tick text")
    .style("font-size", "9px")
)}

function _yAxis2(margin2,d3,y,height2){return(
g => g
    .attr('transform', `translate(${margin2.left})`)
    .call(d3.axisLeft(y).tickSize(0))
    .call(g => g.selectAll(".domain").remove())
  .append("text")
    .attr("x", -margin2.left)
    .attr("y", margin2.top + (height2 - margin2.top - margin2.bottom) / 2)
    .attr("fill", "black")
    .attr("dominant-baseline", "middle")
    .attr("text-anchor", "start")
    .text("Occupation")
    .attr("transform", "rotate(-90)")
    .attr("x", -height2 / 1.9) 
    .attr("y", -margin2.left / 1.1)
)}

function _color(d3,result){return(
d3.scaleQuantile()
    .domain(result.map(d => d.avgrating)) 
    .range(d3.schemeGreens[7])
    .unknown("#eeeeee")
)}

function _123(md){return(
md`### Question 4:`
)}

function _ageRanges(){return(
Array.from({ length: 8 }, (_, i) => `${i * 10}-${i * 10 + 10}`)
)}

function _125(ageRanges){return(
ageRanges.unshift("All")
)}

function _userGenreRatings(ratingdata,moviedata,userdata,ageChosen){return(
ratingdata.map(rating => {
  const movie = moviedata.find(m => m.movieId === rating.movieId);
  if (!movie) return null;

  const user = userdata.find(u => u.userId === rating.userId);
  if (!user) return null;

  if (ageChosen === "All") {
    return movie.genres.map(genre => ({
      userId: rating.userId,
      age: user.age,
      genre: genre,
      rating: rating.rating
    }));
  }
  
  const [minAge, maxAge] = ageChosen.split("-").map(Number);
  if (user.age >= minAge && user.age < maxAge) {
    return movie.genres.map(genre => ({
      userId: rating.userId,
      age: user.age,
      genre: genre,
      rating: rating.rating
    }));
  }
  return null;
}).flat().filter(item => item !== null)
)}

function _userTotalRatings(userGenreRatings){return(
Object.values(
  userGenreRatings.reduce((acc, item) => {
    const key = `${item.userId}-${item.age}-${item.genre}`;
    if (!acc[key]) {
      acc[key] = { ...item, rating: 0 };
    }
    acc[key].rating += item.rating;
    return acc;
  }, {})
)
)}

function _userColor(d3,ageRanges){return(
d3.scaleOrdinal()
    .domain(ageRanges)
    .range(["#EBAE1D", "#EB3026", "#2698EB", "#98EB26", "#EB268B", "gray","#996646", "#78BBEB", "#4B79EB", "#EBB463", "black", "#100CEB", "#353e43", "#EB7E84", "#A25BEB", "#EB6911", "lightgray", "#DC6290", "#DEA387", "#E15FD3"])
)}

function _129(md){return(
md`### Question 5:`
)}

function _Legend(d3){return(
function Legend(color, {
  title,
  tickSize = 6,
  width = 320, 
  height = 44 + tickSize,
  marginTop = 18,
  marginRight = 0,
  marginBottom = 16 + tickSize,
  marginLeft = 0,
  ticks = width / 64,
  tickFormat,
  tickValues
} = {}) {

  function ramp(color, n = 256) {
    const canvas = document.createElement("canvas");
    canvas.width = n;
    canvas.height = 1;
    const context = canvas.getContext("2d");
    for (let i = 0; i < n; ++i) {
      context.fillStyle = color(i / (n - 1));
      context.fillRect(i, 0, 1, 1);
    }
    return canvas;
  }

  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .style("overflow", "visible")
      .style("display", "block");

  let tickAdjust = g => g.selectAll(".tick line").attr("y1", marginTop + marginBottom - height);
  let x;

  // Continuous
  if (color.interpolate) {
    const n = Math.min(color.domain().length, color.range().length);

    x = color.copy().rangeRound(d3.quantize(d3.interpolate(marginLeft, width - marginRight), n));

    svg.append("image")
        .attr("x", marginLeft)
        .attr("y", marginTop)
        .attr("width", width - marginLeft - marginRight)
        .attr("height", height - marginTop - marginBottom)
        .attr("preserveAspectRatio", "none")
        .attr("xlink:href", ramp(color.copy().domain(d3.quantize(d3.interpolate(0, 1), n))).toDataURL());
  }

  // Sequential
  else if (color.interpolator) {
    x = Object.assign(color.copy()
        .interpolator(d3.interpolateRound(marginLeft, width - marginRight)),
        {range() { return [marginLeft, width - marginRight]; }});

    svg.append("image")
        .attr("x", marginLeft)
        .attr("y", marginTop)
        .attr("width", width - marginLeft - marginRight)
        .attr("height", height - marginTop - marginBottom)
        .attr("preserveAspectRatio", "none")
        .attr("xlink:href", ramp(color.interpolator()).toDataURL());

    // scaleSequentialQuantile doesn’t implement ticks or tickFormat.
    if (!x.ticks) {
      if (tickValues === undefined) {
        const n = Math.round(ticks + 1);
        tickValues = d3.range(n).map(i => d3.quantile(color.domain(), i / (n - 1)));
      }
      if (typeof tickFormat !== "function") {
        tickFormat = d3.format(tickFormat === undefined ? ",f" : tickFormat);
      }
    }
  }

  // Threshold
  else if (color.invertExtent) {
    const thresholds
        = color.thresholds ? color.thresholds() // scaleQuantize
        : color.quantiles ? color.quantiles() // scaleQuantile
        : color.domain(); // scaleThreshold

    const thresholdFormat
        = tickFormat === undefined ? d => d
        : typeof tickFormat === "string" ? d3.format(tickFormat)
        : tickFormat;

    x = d3.scaleLinear()
        .domain([-1, color.range().length - 1])
        .rangeRound([marginLeft, width - marginRight]);

    svg.append("g")
      .selectAll("rect")
      .data(color.range())
      .join("rect")
        .attr("x", (d, i) => x(i - 1))
        .attr("y", marginTop)
        .attr("width", (d, i) => x(i) - x(i - 1))
        .attr("height", height - marginTop - marginBottom)
        .attr("fill", d => d);

    tickValues = d3.range(thresholds.length);
    tickFormat = i => thresholdFormat(thresholds[i], i);
  }

  // Ordinal
  else {
    x = d3.scaleBand()
        .domain(color.domain())
        .rangeRound([marginLeft, width - marginRight]);

    svg.append("g")
      .selectAll("rect")
      .data(color.domain())
      .join("rect")
        .attr("x", x)
        .attr("y", marginTop)
        .attr("width", Math.max(0, x.bandwidth() - 1))
        .attr("height", height - marginTop - marginBottom)
        .attr("fill", color);

    tickAdjust = () => {};
  }

  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x)
        .ticks(ticks, typeof tickFormat === "string" ? tickFormat : undefined)
        .tickFormat(typeof tickFormat === "function" ? tickFormat : undefined)
        .tickSize(tickSize)
        .tickValues(tickValues))
      .call(tickAdjust)
      .call(g => g.select(".domain").remove())
      .call(g => g.append("text")
        .attr("x", marginLeft)
        .attr("y", marginTop + marginBottom - height - 6)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .attr("class", "title")
        .text(title));

  return svg.node();
}
)}

function _getStateFromZip(){return(
function getStateFromZip(zipcode) {
  const zip = parseInt(zipcode, 10);
  if (zip >= 35000 && zip <= 36999) return "Alabama";
  else if (zip >= 99500 && zip <= 99999) return "Alaska";
  else if (zip >= 85000 && zip <= 86999) return "Arizona";
  else if (zip >= 71600 && zip <= 72999 || zip === 75502) return "Arkansas";
  else if (zip >= 90000 && zip <= 96699) return "California";
  else if (zip >= 80000 && zip <= 81999) return "Colorado";
  else if (zip >= 6000 && zip <= 6999) return "Connecticut";
  else if (zip >= 19700 && zip <= 19999) return "Delaware";
  else if (zip >= 32000 && zip <= 34999) return "Florida";
  else if (zip >= 30000 && zip <= 31999 || zip === 39800) return "Georgia";
  else if (zip >= 96700 && zip <= 96999) return "Hawaii";
  else if (zip >= 83200 && zip <= 83999) return "Idaho";
  else if (zip >= 60000 && zip <= 62999) return "Illinois";
  else if (zip >= 46000 && zip <= 47999) return "Indiana";
  else if (zip >= 50000 && zip <= 52999) return "Iowa";
  else if (zip >= 66000 && zip <= 67999) return "Kansas";
  else if (zip >= 40000 && zip <= 42999) return "Kentucky";
  else if (zip >= 70000 && zip <= 71599) return "Louisiana";
  else if (zip >= 3900 && zip <= 4999) return "Maine";
  else if (zip >= 1000 && zip <= 2799) return "Massachusetts";
  else if (zip >= 5500 && zip <= 5599) return "Massachusetts";
  else if (zip >= 20600 && zip <= 21999) return "Maryland";
  else if (zip >= 48000 && zip <= 49999) return "Michigan";
  else if (zip >= 55000 && zip <= 56799) return "Minnesota";
  else if (zip >= 39000 && zip <= 39999) return "Mississippi";
  else if (zip >= 63000 && zip <= 65999) return "Missouri";
  else if (zip >= 59000 && zip <= 59999) return "Montana";
  else if (zip >= 27000 && zip <= 28999) return "North Carolina";
  else if (zip >= 58000 && zip <= 58999) return "North Dakota";
  else if (zip >= 68000 && zip <= 69999) return "Nebraska";
  else if (zip >= 88900 && zip <= 89999) return "Nevada";
  else if (zip >= 3000 && zip <= 3899) return "New Hampshire";
  else if (zip >= 7000 && zip <= 8999) return "New Jersey";
  else if (zip >= 87000 && zip <= 88499) return "New Mexico";
  else if (zip >= 10000 && zip <= 14999) return "New York";
  else if (zip >= 43000 && zip <= 45999) return "Ohio";
  else if (zip >= 73000 && zip <= 74999) return "Oklahoma";
  else if (zip >= 97000 && zip <= 97999) return "Oregon";
  else if (zip >= 15000 && zip <= 19699) return "Pennsylvania";
  else if (zip >= 300 && zip <= 999) return "Puerto Rico";
  else if (zip >= 2800 && zip <= 2999) return "Rhode Island";
  else if (zip >= 29000 && zip <= 29999) return "South Carolina";
  else if (zip >= 57000 && zip <= 57999) return "South Dakota";
  else if (zip >= 37000 && zip <= 38599) return "Tennessee";
  else if (zip >= 75000 && zip <= 79999 || zip >= 73301 && zip <= 73399) return "Texas";
  else if (zip >= 84000 && zip <= 84999) return "Utah";
  else if (zip >= 5000 && zip <= 5999) return "Vermont";
  else if (zip >= 22000 && zip <= 24699) return "Virginia";
  else if (zip >= 20000 && zip <= 20599) return "District of Columbia";
  else if (zip >= 98000 && zip <= 99499) return "Washington";
  else if (zip >= 24700 && zip <= 26899) return "West Virginia";
  else if (zip >= 53000 && zip <= 54999) return "Wisconsin";
  else if (zip >= 82000 && zip <= 83199) return "Wyoming";
  else return "Unknown";
}
)}

function _enrichUserdataWithState(getStateFromZip){return(
async function enrichUserdataWithState(userdata) {
  const enrichedData = [];
  for (const user of userdata) {
    const state = await getStateFromZip(user.zipcode);
    enrichedData.push({ ...user, state });
  }
  return enrichedData;
}
)}

function _userdataWithState(enrichUserdataWithState,userdata){return(
enrichUserdataWithState(userdata)
)}

function _usaMargin(){return(
{top: 70, right: 125, bottom: 50, left: 20}
)}

function _usaWidth(usaMargin){return(
800 - usaMargin.top - usaMargin.bottom
)}

function _usaHeight(usaMargin){return(
500 - usaMargin.top - usaMargin.bottom
)}

function _usaProjection(d3,usaWidth,usaHeight,usaGeo){return(
d3.geoAlbersUsa()
      .fitSize([usaWidth, usaHeight], usaGeo)
)}

function _usaPath(d3,usaProjection){return(
d3.geoPath().projection(usaProjection)
)}

function _colorScale(d3){return(
d3.scaleQuantile()
  .domain([0, 8000])
  .range(d3.schemeOranges[9])
  .unknown("#eeeeee")
)}

function _mergedData(ratingdata,userdataWithState){return(
ratingdata.map(rating => {
  const user = userdataWithState.find(user => user.userId === rating.userId);
  return user ? { ...rating, state: user.state } : null;
}).filter(d => d)
)}

function _groupedByState(d3,mergedData){return(
d3.group(mergedData, d => d.state)
)}

function _averageRatingsByState(groupedByState,d3){return(
Array.from(groupedByState, ([state, records]) => ({
  state,
  averageRating: d3.mean(records, d => d.rating)
}))
)}

function _ratingMap(averageRatingsByState){return(
new Map(averageRatingsByState.map(d => [d.state, d.averageRating]))
)}

function _movieWithGenres(ratingdata,moviedata){return(
ratingdata.map(rating => {
  const movie = moviedata.find(movie => movie.movieId === rating.movieId);
  
  return {
    userId: rating.userId,
    movieId: rating.movieId,
    rating: rating.rating,
    genres: movie ? movie.genres : []
  };
})
)}

function _userMovieData(movieWithGenres,userdata){return(
movieWithGenres.map(entry => {
  const user = userdata.find(user => user.userId === entry.userId);
  return {
    ...entry,
    state: user ? user.zipcode : null
  };
})
)}

function _stateGenreRatings(d3,userMovieData){return(
d3.group(userMovieData, d => d.state)
)}

function _topGenresByState(stateGenreRatings){return(
Array.from(stateGenreRatings.entries()).map(([state, userRatings]) => {
  const genreRatings = {};

  userRatings.forEach(d => {
    d.genres.forEach(genre => {
      if (!genreRatings[genre]) {
        genreRatings[genre] = { totalRating: 0 };
      }
      genreRatings[genre].totalRating += d.rating; 
    });
  });

  const genreTotalRatings = Object.entries(genreRatings).map(([genre, { totalRating }]) => {
    return { genre, totalRating };
  });

  genreTotalRatings.sort((a, b) => b.totalRating - a.totalRating);
  const top3Genres = genreTotalRatings.slice(0, 5);

  return { state, topGenres: top3Genres };
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("viewof decades")).define("viewof decades", ["Inputs","decadeColumns"], _decades);
  main.variable(observer("decades")).define("decades", ["Generators", "viewof decades"], (G, _) => G.input(_));
  main.variable(observer("viewof type")).define("viewof type", ["Inputs","typeColumns"], _type);
  main.variable(observer("type")).define("type", ["Generators", "viewof type"], (G, _) => G.input(_));
  main.variable(observer()).define(["d3","width","heightQ1","type","cleanedMovieTotalRatings","sortedGenreTotalRatings","movieScale","ratingScaleQ1","marginQ1","yAxisRat","xAxisRat"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("viewof genderChosen")).define("viewof genderChosen", ["Inputs","genderList"], _genderChosen);
  main.variable(observer("genderChosen")).define("genderChosen", ["Generators", "viewof genderChosen"], (G, _) => G.input(_));
  main.variable(observer()).define(["Swatches","d3"], _20);
  main.variable(observer()).define(["d3","width","height","sortedGenreAverages","genreScaleBand","genderChosen","ratingScale","genderColorMap","othersortedGenreAverages","margin","yAxis"], _21);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer()).define(["legend","color"], _26);
  main.variable(observer()).define(["d3","width","height2","yAxis2","xAxis","margin2","x","y","sortedGenres","sortedOccupations","result","color"], _27);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer()).define(["md"], _31);
  main.variable(observer("viewof ageChosen")).define("viewof ageChosen", ["Inputs","ageRanges"], _ageChosen);
  main.variable(observer("ageChosen")).define("ageChosen", ["Generators", "viewof ageChosen"], (G, _) => G.input(_));
  main.variable(observer()).define(["swatches","userColor"], _33);
  main.variable(observer("viewof radarPlot")).define("viewof radarPlot", ["ageRanges","userTotalRatings","top20Genres","d3","userColor"], _radarPlot);
  main.variable(observer("radarPlot")).define("radarPlot", ["Generators", "viewof radarPlot"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _35);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer()).define(["md"], _37);
  main.variable(observer()).define(["md"], _38);
  main.variable(observer()).define(["md"], _39);
  main.variable(observer()).define(["md"], _40);
  main.variable(observer()).define(["Legend","d3"], _41);
  main.variable(observer()).define(["d3","usaWidth","usaMargin","usaHeight","usaGeo","usaPath","groupedByState","colorScale","topGenresByState","getStateFromZip"], _42);
  main.variable(observer()).define(["md"], _43);
  main.variable(observer()).define(["md"], _44);
  main.variable(observer()).define(["md"], _45);
  main.variable(observer()).define(["md"], _46);
  main.variable(observer()).define(["md"], _47);
  main.variable(observer()).define(["md"], _48);
  main.variable(observer()).define(["md"], _49);
  main.variable(observer("userCsvUrl")).define("userCsvUrl", _userCsvUrl);
  main.variable(observer("movieCsvUrl")).define("movieCsvUrl", _movieCsvUrl);
  main.variable(observer("ratingCsvUrl")).define("ratingCsvUrl", _ratingCsvUrl);
  main.variable(observer("userdata")).define("userdata", ["d3","userCsvUrl"], _userdata);
  main.variable(observer("moviedata")).define("moviedata", ["d3","movieCsvUrl"], _moviedata);
  main.variable(observer("ratingdata")).define("ratingdata", ["d3","ratingCsvUrl"], _ratingdata);
  main.variable(observer()).define(["md"], _56);
  main.variable(observer("YearUpdatedMovieData")).define("YearUpdatedMovieData", ["moviedata"], _YearUpdatedMovieData);
  main.variable(observer("yearPeriod")).define("yearPeriod", ["decades"], _yearPeriod);
  main.variable(observer("filteredMovies")).define("filteredMovies", ["YearUpdatedMovieData","yearPeriod"], _filteredMovies);
  main.variable(observer("filteredMovieIds")).define("filteredMovieIds", ["filteredMovies"], _filteredMovieIds);
  main.variable(observer("movieRatingsMap")).define("movieRatingsMap", ["movieRatingsSum"], _movieRatingsMap);
  main.variable(observer("genreRatings")).define("genreRatings", ["filteredMovies","movieRatingsMap"], _genreRatings);
  main.variable(observer("genreTotalRatings")).define("genreTotalRatings", ["genreRatings"], _genreTotalRatings);
  main.variable(observer("movieRatingsSum")).define("movieRatingsSum", ["d3","ratingdata","filteredMovieIds"], _movieRatingsSum);
  main.variable(observer("movieTotalRatings")).define("movieTotalRatings", ["d3","movieRatingsSum","moviedata"], _movieTotalRatings);
  main.variable(observer("sorteMovieTotalRatings")).define("sorteMovieTotalRatings", ["d3","movieTotalRatings"], _sorteMovieTotalRatings);
  main.variable(observer("sortedGenreTotalRatings")).define("sortedGenreTotalRatings", ["d3","genreTotalRatings"], _sortedGenreTotalRatings);
  main.variable(observer("cleanedMovieTotalRatings")).define("cleanedMovieTotalRatings", ["sorteMovieTotalRatings"], _cleanedMovieTotalRatings);
  main.variable(observer("maxRating")).define("maxRating", ["d3","type","cleanedMovieTotalRatings","sortedGenreTotalRatings"], _maxRating);
  main.variable(observer("top30Movies")).define("top30Movies", ["cleanedMovieTotalRatings"], _top30Movies);
  main.variable(observer("top20Genres")).define("top20Genres", ["sortedGenreTotalRatings"], _top20Genres);
  main.variable(observer("heightQ1")).define("heightQ1", _heightQ1);
  main.variable(observer("getMargins")).define("getMargins", _getMargins);
  main.variable(observer("marginQ1")).define("marginQ1", ["getMargins","type"], _marginQ1);
  main.variable(observer("movieScaleBand")).define("movieScaleBand", ["d3","type","top30Movies","top20Genres","marginQ1","width"], _movieScaleBand);
  main.variable(observer("movieScale")).define("movieScale", ["d3","type","top30Movies","top20Genres","marginQ1","width"], _movieScale);
  main.variable(observer("ratingScaleQ1")).define("ratingScaleQ1", ["d3","maxRating","heightQ1","marginQ1"], _ratingScaleQ1);
  main.variable(observer("xAxisRat")).define("xAxisRat", ["d3","movieScale"], _xAxisRat);
  main.variable(observer("yAxisRat")).define("yAxisRat", ["d3","ratingScaleQ1"], _yAxisRat);
  main.variable(observer("typeColumns")).define("typeColumns", _typeColumns);
  main.variable(observer("decadeColumns")).define("decadeColumns", _decadeColumns);
  const child1 = runtime.module(define1);
  main.import("legend", child1);
  main.import("Swatches", child1);
  main.import("swatches", child1);
  main.variable(observer()).define(["md"], _83);
  main.variable(observer("genderRatings")).define("genderRatings", ["ratingdata","userdata","moviedata"], _genderRatings);
  main.variable(observer("genderList")).define("genderList", _genderList);
  main.variable(observer("genderMap")).define("genderMap", ["genderList"], _genderMap);
  main.variable(observer("genderColorMap")).define("genderColorMap", ["genderList"], _genderColorMap);
  main.variable(observer("height")).define("height", _height);
  main.variable(observer("margin")).define("margin", _margin);
  main.variable(observer("ratingScale")).define("ratingScale", ["d3","maxRatingG","height","margin"], _ratingScale);
  main.variable(observer("maxRatingG")).define("maxRatingG", ["genreAverages"], _maxRatingG);
  main.variable(observer("yAxis")).define("yAxis", ["d3","ratingScale"], _yAxis);
  main.variable(observer("filteredData")).define("filteredData", ["genderRatings"], _filteredData);
  main.variable(observer("chosenGenderRatings")).define("chosenGenderRatings", ["filteredData","genderMap","genderChosen"], _chosenGenderRatings);
  main.variable(observer("otherRatings")).define("otherRatings", ["filteredData","genderChosen","genderMap"], _otherRatings);
  main.variable(observer("genreMap")).define("genreMap", ["d3","chosenGenderRatings"], _genreMap);
  main.variable(observer("othergenreMap")).define("othergenreMap", ["d3","otherRatings"], _othergenreMap);
  main.variable(observer("genreAverages")).define("genreAverages", ["genreMap"], _genreAverages);
  main.variable(observer("othergenreAverages")).define("othergenreAverages", ["othergenreMap"], _othergenreAverages);
  main.variable(observer("sortedGenreAverages")).define("sortedGenreAverages", ["genreAverages"], _sortedGenreAverages);
  main.variable(observer("othersortedGenreAverages")).define("othersortedGenreAverages", ["othergenreAverages"], _othersortedGenreAverages);
  main.variable(observer("allGenresG")).define("allGenresG", ["genderChosen","sortedGenreAverages","othergenreAverages"], _allGenresG);
  main.variable(observer("genreScaleBand")).define("genreScaleBand", ["d3","allGenresG","margin","width"], _genreScaleBand);
  main.variable(observer()).define(["md"], _104);
  main.variable(observer("occupationRatings")).define("occupationRatings", ["ratingdata","userdata","moviedata"], _occupationRatings);
  main.variable(observer("filteredData2")).define("filteredData2", ["occupationRatings"], _filteredData2);
  main.variable(observer("nestedData")).define("nestedData", ["d3","filteredData2"], _nestedData);
  main.variable(observer("result")).define("result", ["nestedData","d3"], _result);
  main.variable(observer("occupationAvg")).define("occupationAvg", ["d3","filteredData2"], _occupationAvg);
  main.variable(observer("occupationAvgRatings")).define("occupationAvgRatings", ["d3","result"], _occupationAvgRatings);
  main.variable(observer("genreAvgRatings")).define("genreAvgRatings", ["d3","result"], _genreAvgRatings);
  main.variable(observer("sortedOccupationsData")).define("sortedOccupationsData", ["occupationAvgRatings"], _sortedOccupationsData);
  main.variable(observer("sortedGenresData")).define("sortedGenresData", ["genreAvgRatings"], _sortedGenresData);
  main.variable(observer("sortedOccupations")).define("sortedOccupations", ["sortedOccupationsData"], _sortedOccupations);
  main.variable(observer("sortedGenres")).define("sortedGenres", ["sortedGenresData"], _sortedGenres);
  main.variable(observer("height2")).define("height2", ["margin2"], _height2);
  main.variable(observer("margin2")).define("margin2", _margin2);
  main.variable(observer("x")).define("x", ["d3","sortedGenres","margin2","width"], _x);
  main.variable(observer("y")).define("y", ["d3","sortedOccupations","margin2","height2"], _y);
  main.variable(observer("xAxis")).define("xAxis", ["margin2","d3","x"], _xAxis);
  main.variable(observer("yAxis2")).define("yAxis2", ["margin2","d3","y","height2"], _yAxis2);
  main.variable(observer("color")).define("color", ["d3","result"], _color);
  main.variable(observer()).define(["md"], _123);
  main.variable(observer("ageRanges")).define("ageRanges", _ageRanges);
  main.variable(observer()).define(["ageRanges"], _125);
  main.variable(observer("userGenreRatings")).define("userGenreRatings", ["ratingdata","moviedata","userdata","ageChosen"], _userGenreRatings);
  main.variable(observer("userTotalRatings")).define("userTotalRatings", ["userGenreRatings"], _userTotalRatings);
  main.variable(observer("userColor")).define("userColor", ["d3","ageRanges"], _userColor);
  main.variable(observer()).define(["md"], _129);
  const child2 = runtime.module(define2);
  main.import("usaGeo", child2);
  main.variable(observer("Legend")).define("Legend", ["d3"], _Legend);
  main.variable(observer("getStateFromZip")).define("getStateFromZip", _getStateFromZip);
  main.variable(observer("enrichUserdataWithState")).define("enrichUserdataWithState", ["getStateFromZip"], _enrichUserdataWithState);
  main.variable(observer("userdataWithState")).define("userdataWithState", ["enrichUserdataWithState","userdata"], _userdataWithState);
  main.variable(observer("usaMargin")).define("usaMargin", _usaMargin);
  main.variable(observer("usaWidth")).define("usaWidth", ["usaMargin"], _usaWidth);
  main.variable(observer("usaHeight")).define("usaHeight", ["usaMargin"], _usaHeight);
  main.variable(observer("usaProjection")).define("usaProjection", ["d3","usaWidth","usaHeight","usaGeo"], _usaProjection);
  main.variable(observer("usaPath")).define("usaPath", ["d3","usaProjection"], _usaPath);
  main.variable(observer("colorScale")).define("colorScale", ["d3"], _colorScale);
  main.variable(observer("mergedData")).define("mergedData", ["ratingdata","userdataWithState"], _mergedData);
  main.variable(observer("groupedByState")).define("groupedByState", ["d3","mergedData"], _groupedByState);
  main.variable(observer("averageRatingsByState")).define("averageRatingsByState", ["groupedByState","d3"], _averageRatingsByState);
  main.variable(observer("ratingMap")).define("ratingMap", ["averageRatingsByState"], _ratingMap);
  main.variable(observer("movieWithGenres")).define("movieWithGenres", ["ratingdata","moviedata"], _movieWithGenres);
  main.variable(observer("userMovieData")).define("userMovieData", ["movieWithGenres","userdata"], _userMovieData);
  main.variable(observer("stateGenreRatings")).define("stateGenreRatings", ["d3","userMovieData"], _stateGenreRatings);
  main.variable(observer("topGenresByState")).define("topGenresByState", ["stateGenreRatings"], _topGenresByState);
  return main;
}
