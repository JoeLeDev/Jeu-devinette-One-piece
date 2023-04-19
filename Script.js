// Charger le fichier txt contenant la liste des mots
fetch("liste.txt")
.then(response => response.text())
.then(data =>{
    // Transformer la liste des mots en tableau
    let wordList = data.split("\n");
    
    // Sélectionner un mot aléatoire
    let randomIndex = Math.floor(Math.random() * wordList.length);
    const wordToGuess = wordList[randomIndex];
     // alert(wordToGuess) Aide si on ne le trouver pas le mot
    // Créer le mot caché
    let wordLength = wordToGuess.length;
    let hiddenWord = "";
    for(let i = 0 ; i < wordLength ; i++) {
        hiddenWord += "_";
    }

    // Afficher le mot caché
    document.getElementById("word").innerHTML = hiddenWord;

    // Récupérer les éléments HTML nécessaires
    let guessInput = document.getElementById("guess");
    let submitButton = document.getElementById("submit");
    let result = document.getElementById("result");
    let linkInput = document.getElementById("link");
    let scoreDisplay = document.getElementById("score");


    // Définir le nombre de chances
    let chances = 7;

    // Fonction à exécuter lors de la soumission d'une lettre
    submitButton.onclick = function() {
        let guess = guessInput.value;
        if (guess.length > 1) {
            result.innerHTML = "Entrez une lettre à la fois";
        }
        else if (guess ==' ') {
            result.innerHTML = `Vous avez oublié d'entrez une lettre`
        }
        else if (guess.length === 0){
            result.innerHTML = "Vous devez entrer une lettre";
        } else if (wordToGuess.indexOf(guess) === -1) {
            chances--;
            if (chances > 0) {
                result.innerHTML = "Mauvaise lettre. Il vous reste " + chances + " chances.";
            } else {
                result.innerHTML = "Vous avez perdu. Le mot était : " + wordToGuess;
                guessInput.style.display = "none";
                submitButton.style.display = "none";
                linkInput.style.display = "block";
            }
        } else {
            // Mettre à jour le mot caché
            let newHiddenWord = "";
            for (let i = 0; i < wordLength; i++) {
                if (wordToGuess[i] === guess) {
                    newHiddenWord += guess;
                } else {
                    newHiddenWord += hiddenWord[i];
                }
            }
            hiddenWord = newHiddenWord;
            document.getElementById("word").innerHTML = hiddenWord;

            // Ajouter l'animation au mot caché
            document.getElementById("word").classList.add("updated");
            setTimeout(() => {
                document.getElementById("word").classList.remove("updated");
            }, 300);

            // Vérifier si le joueur a deviné le mot complet
            if (hiddenWord === wordToGuess) {
                result.innerHTML = "Bonne réponse";
                guessInput.style.display = "none";
                submitButton.style.display = "none";
                result.classList.add("updated");
                setTimeout(() => {
                    result.classList.remove("updated");
                }, 1000);
                linkInput.style.display = "block";
            } else {
                result.innerHTML = "Continuez !";
            }
       
         // Vérifier si le joueur a deviné le mot complet
                if (hiddenWord === wordToGuess) {
                    // Calculez le score basé sur les chances restantes
                    let score = chances * 1;
                    // Chaque erreur enleve un point
                    // Affichez le score
                    scoreDisplay.innerHTML = "Votre score : " + score;

                    result.innerHTML = "GG tu as trouvé la réponse";
                    guessInput.style.display = "none";
                    submitButton.style.display = "none";
                    result.classList.add("updated");
                    setTimeout(() => {
                        result.classList.remove("updated");
                    }, 1000);
                     linkInput.style.display = "block";
                } else {
                    result.innerHTML = "Continuez !";
                }
        }
    }
})
