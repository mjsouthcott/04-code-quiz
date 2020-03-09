# Code Quiz

## Description

This website quizzes users on their basic Javascript knowledge. Users have 45 seconds to answer 5 multiple choice questions. For each incorrect answer, 5 seconds is subtracted from the remaining time. Once they've completed the quiz, users can add their initials to a high score list.

This website meets all of the acceptance criteria specified by the customer.

## Installation

Click on the following URL to view the website in your browser: [https://mjsouthcott.github.io/04-code-quiz/](https://mjsouthcott.github.io/04-code-quiz/).

## Usage

1.  To start the quiz, click the Start Quiz button in the center of the window. To view the High Scores page, click the link in the top left corner. Note the timer in the top right corner.

![Step 1](https://github.com/mjsouthcott/04-code-quiz/blob/master/images/image1.JPG)

2.  Once the quiz starts, a question from a randomized list will appear in the center of the window. Select 1 of 4 answers to move on to the next question (feedback will appear below the 4th answer notifying you if you selected the correct answer or not). Note that the timer will begin counting down from 60 seconds. Incorrect answers will reduce the time remaining by 10 seconds. If the timer reaches 0 before you answer the 5th question, the quiz will end.

![Step 2](https://github.com/mjsouthcott/04-code-quiz/blob/master/images/image2.JPG)

3.  Once the quiz ends, enter your initials into the text input field and click the Submit button.

![Step 3](https://github.com/mjsouthcott/04-code-quiz/blob/master/images/image3.JPG)

4.  The High Scores page displays a list of initials and corresponding scores, sorted in descending order. The list contents are stored in localStorage, meaning they persist between quizzes (play more than once to see the list grow).

![Step 4](https://github.com/mjsouthcott/04-code-quiz/blob/master/images/image4.JPG)

5.  Click the Clear High Scores button to clear the list and the Go Back button to return to the home page.

![Step 5](https://github.com/mjsouthcott/04-code-quiz/blob/master/images/image5.JPG)

## Credits

Matthew Southcott, Front-end Developer, Company X


## License

MIT License

Copyright (c) 2020 Matthew James Southcott

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.