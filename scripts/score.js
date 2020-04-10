const username = document.getElementById('username');
const saveHighScore = document.getElementById('saveScoreBtn');
const finialScore = document.getElementById('finialScore');
const recentScore = localStorage.getItem('recentScore');

const highScore = JSON.parse(localStorage.getItem('highScore')) || [];
const maxHighScore = 5;



finialScore.innerText = recentScore;
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
    
});

saveHighScore.addEventListener('click', e => {
    e.preventDefault();

    const score = {
        name : username.value,
        score : recentScore
       
    };
    highScore.push(score);
    highScore.sort( (a,b) => b.score - a.score)
    highScore.splice(5);

    localStorage.setItem('highScore', JSON.stringify(highScore));
    window.location.assign('../index.html')
    
    
})