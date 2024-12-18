const getScoreRemark = (score) => {
    if (score == 100) {
        return "Twin! Where have you been ?";
    } else if (score >= 80) {
        return "we are good pals";
    } else if (score >= 50) {
        return "Now you know me ";
    } else {
        return "may be you have forgotten me or this is first time ";
    }
};

// Get the final score and display it with the remark
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
finalScore.innerText = `${mostRecentScore} - ${getScoreRemark(mostRecentScore)}`;


