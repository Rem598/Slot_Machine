from flask import Flask, render_template, request
import random

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    results = None
    message = None
    final_balance = None

    if request.method == 'POST':
        print("Form data:", request.form)

        try:
            bet_amount = float(request.form.get('bet_amount', 0))
            deposit_amount = float(request.form.get('deposit_amount'))

            # Generate random results for the slot machine
            results = [random.choice(['🍒', '🍋', '🍉', '🍊', '🍓']) for _ in range(3)]
            
            # Check for win condition
            if results[0] == results[1] == results[2]:
                message = "Congratulations! You won!"
                final_balance = deposit_amount + bet_amount
            else:
                message = "Try again!"
                final_balance = deposit_amount - bet_amount

            return render_template('index.html', results=results, message=message, final_balance=final_balance)
        except ValueError:
            message = "Invalid input. Please enter numerical values."
            return render_template('index.html', results=None, message=message, final_balance=None)
        
    return render_template('index.html', results=None, message=None, final_balance=None)

if __name__ == "__main__":
    app.run(debug=True)
