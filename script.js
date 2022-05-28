const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show new Quotes
function newQuote() {
    loading();
    // pick a random quote from apiQuoteArray
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if author filed is blank and replace it with anonymous
    if (!quote.author) {
        authorText.textContent = 'Anonymous';
    } else {
        authorText.textContent = quote.author;
    }

    // Check Quote Length to determine Styling_messages
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');

    } else {
        quoteText.classList.remove('long-quote');
    }

    //Set Quote, Hide loader
    quoteText.textContent = quote.text;
    complete();



}


//Get Quotes from Api

async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';

    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch error here
    }


}
// Tweet quotes
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}


// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
//On Load
getQuotes();