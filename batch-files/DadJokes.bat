@echo off
color 0A
echo Starting the Joke Machine...

powershell -Command ^
"$website = 'https://icanhazdadjoke.com/'; ^
$title = 'Susu''s Joke Machine'; ^
Add-Type -AssemblyName System.Windows.Forms; ^
$mb = [System.Windows.Forms.MessageBox]; ^
do { ^
    $joke = (Invoke-WebRequest $website -Headers @{'Accept'='text/plain'}).Content; ^
    $answer = $mb::Show($joke, $title, 'OKCancel'); ^
} while ($answer -eq 'OK')"