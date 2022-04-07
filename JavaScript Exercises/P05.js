let students = [
	{ name: "Ivan", socre: 5 },
	{ name: "Dimitar", socre: 5.5 },
	{ name: "Kristian", socre: 4 },
	{ name: "Valentin", socre: 6 },
	{ name: "Veselin", socre: 3 },
	{ name: "Genadi", socre: 5 },
	{ name: "Yavor", socre: 3 },
	{ name: "Marin", socre: 5.5 },
	{ name: "Kalin", socre: 3 },
	{ name: "Yavor", socre: 6 }
];

let studentsWithHighScore = [];

students.forEach((student) => {
    if (student.socre >= 5.5) {
        studentsWithHighScore.push(student);
    }
});

studentsWithHighScore.forEach((student) => console.log(`Student: ${student.name} - Score: ${student.socre}`))