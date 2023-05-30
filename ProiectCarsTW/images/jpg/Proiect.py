import sys
import numpy as np
from fractions import Fraction
from PyQt5.QtWidgets import QApplication, QWidget, QVBoxLayout, QPushButton, QLabel, QLineEdit, QHBoxLayout, QDialog
from PyQt5.QtCore import Qt
from PyQt5.QtGui import QFont
from matplotlib.backends.backend_qt5agg import FigureCanvasQTAgg as FigureCanvas
from matplotlib.figure import Figure

class MainWindow(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Metode numerice")
        self.layout = QVBoxLayout()

        self.coarda_button = QPushButton("Metoda coardei")
        self.coarda_button.clicked.connect(self.open_coarda_dialog)

        self.bisectie_button = QPushButton("Metoda bisecției")
        self.bisectie_button.clicked.connect(self.open_bisectie_dialog)

        self.layout.addWidget(self.coarda_button)
        self.layout.addWidget(self.bisectie_button)

        self.setLayout(self.layout)

    def open_coarda_dialog(self):
        dialog = CoardaDialog()
        dialog.exec_()

    def open_bisectie_dialog(self):
        dialog = BisectieDialog()
        dialog.exec_()

class CoardaDialog(QDialog):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Metoda coardei")
        self.layout = QVBoxLayout()

        self.xn_2_label = QLabel("xn_2:")
        self.xn_2_input = QLineEdit()
        self.xn_1_label = QLabel("xn_1:")
        self.xn_1_input = QLineEdit()
        self.c1_label = QLabel("c1:")
        self.c1_input = QLineEdit()
        self.c2_label = QLabel("c2:")
        self.c2_input = QLineEdit()

        self.ok_button = QPushButton("OK")
        self.ok_button.clicked.connect(self.run_coarda)

        self.results_label = QLabel()
        self.results_label.setFont(QFont("Arial", 12, QFont.Bold))

        self.figure = Figure()
        self.canvas = FigureCanvas(self.figure)

        self.layout.addWidget(self.xn_2_label)
        self.layout.addWidget(self.xn_2_input)
        self.layout.addWidget(self.xn_1_label)
        self.layout.addWidget(self.xn_1_input)
        self.layout.addWidget(self.c1_label)
        self.layout.addWidget(self.c1_input)
        self.layout.addWidget(self.c2_label)
        self.layout.addWidget(self.c2_input)
        self.layout.addWidget(self.ok_button)
        self.layout.addWidget(self.results_label)
        self.layout.addWidget(self.canvas)

        self.setLayout(self.layout)

    def run_coarda(self):
        xn_2 = self.xn_2_input.text()
        xn_1 = self.xn_1_input.text()
        c1 = self.c1_input.text()
        c2 = self.c2_input.text()

        if not xn_2 or not xn_2.replace(".", "").replace("-", "").isdigit():
            self.results_label.setText("Eroare: Introduceți o valoare numerică validă pentru xn_2")
            return
        if not xn_1 or not xn_1.replace(".", "").replace("-", "").isdigit():
            self.results_label.setText("Eroare: Introduceți o valoare numerică validă pentru xn_1")
            return
        if not c1 or not c1.replace(".", "").replace("-", "").isdigit():
            self.results_label.setText("Eroare: Introduceți o valoare numerică validă pentru c1")
            return
        if not c2 or not c2.replace(".", "").replace("-", "").isdigit():
            self.results_label.setText("Eroare: Introduceți o valoare numerică validă pentru c2")
            return

        xn_2 = float(Fraction(xn_2))
        xn_1 = float(Fraction(xn_1))
        c1 = float(Fraction(c1))
        c2 = float(Fraction(c2))

        iterations = []
        errors = []

        for n in range(2, 11):
            xn = (10/3)*xn_1 - xn_2
            xn_exact = c1*(1/3)**n + c2*3**n
            er_n = abs(xn_exact - xn)

            if n >= 3:
                rap_n = er_n / er_n_1
                print(rap_n)

            errors.append(er_n)
            iterations.append(xn)

            er_n_1 = er_n
            xn_2 = xn_1
            xn_1 = xn

        results = [f"xn{i} = {iterations[i-2]:.6f}, er{i} = {errors[i-2]:.6e}" for i in range(2, 11)]
        results_text = "\n".join(results)

        self.results_label.setText(results_text)

        x_vals = np.arange(2, 11)
        y_vals = errors

        self.figure.clear()
        ax = self.figure.add_subplot(111)
        ax.plot(x_vals, y_vals, 'r-', label='Error')
        ax.set_xlabel('Iteration')
        ax.set_ylabel('Error')
        ax.legend()
        ax.grid(True)
        self.canvas.draw()

class BisectieDialog(QDialog):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Metoda bisecției")
        self.layout = QVBoxLayout()

        self.f_label = QLabel("f(x):")
        self.f_input = QLineEdit()
        self.a_label = QLabel("a:")
        self.a_input = QLineEdit()
        self.b_label = QLabel("b:")
        self.b_input = QLineEdit()
        self.tol_label = QLabel("tol:")
        self.tol_input = QLineEdit()

        self.ok_button = QPushButton("OK")
        self.ok_button.clicked.connect(self.run_bisectie)

        self.result_label = QLabel()
        self.result_label.setFont(QFont("Arial", 12, QFont.Bold))

        self.figure = Figure()
        self.canvas = FigureCanvas(self.figure)
        self.layout.addWidget(self.canvas)

        self.layout.addWidget(self.f_label)
        self.layout.addWidget(self.f_input)
        self.layout.addWidget(self.a_label)
        self.layout.addWidget(self.a_input)
        self.layout.addWidget(self.b_label)
        self.layout.addWidget(self.b_input)
        self.layout.addWidget(self.tol_label)
        self.layout.addWidget(self.tol_input)
        self.layout.addWidget(self.ok_button)
        self.layout.addWidget(self.result_label)

        self.setLayout(self.layout)

    def run_bisectie(self):
        f_expr = self.f_input.text()
        a = self.a_input.text()
        b = self.b_input.text()
        tol = self.tol_input.text()

        if not a or not a.replace(".", "").replace("-", "").isdigit():
            self.result_label.setText("Eroare: Introduceți o valoare numerică validă pentru a")
            return
        if not b or not b.replace(".", "").replace("-", "").isdigit():
            self.result_label.setText("Eroare: Introduceți o valoare numerică validă pentru b")
            return
        if not tol or not tol.replace(".", "").isdigit():
            self.result_label.setText("Eroare: Introduceți o valoare numerică validă pentru tol")
            return

        a = float(Fraction(a))
        b = float(Fraction(b))
        tol = float(Fraction(tol))

        # Define the function f(x)
        f = lambda x: eval(f_expr, {"np": np, "sin": np.sin, "cos": np.cos, "tan": np.tan, "x": x})

        # Implement the bisection method
        def my_bisection(f, a, b, tol):
            # approximates a root, R, of f bounded
            # by a and b to within tolerance
            # | f(m) | < tol with m the midpoint
            # between a and b Recursive implementation

            # check if a and b bound a root
            if np.sign(f(a)) == np.sign(f(b)):
                raise Exception("The scalars a and b do not bound a root")

            # get midpoint
            m = (a + b) / 2

            if np.abs(f(m)) < tol:
                # stopping condition, report m as root
                return m
            elif np.sign(f(a)) == np.sign(f(m)):
                # case where m is an improvement on a.
                # Make recursive call with a = m
                return my_bisection(f, m, b, tol)
            elif np.sign(f(b)) == np.sign(f(m)):
                # case where m is an improvement on b.
                # Make recursive call with b = m
                return my_bisection(f, a, m, tol)

        # Run the bisection method
        try:
            result = my_bisection(f, a, b, tol)
            self.result_label.setText(f"Root: {result:.6f}")
        except Exception as e:
            self.result_label.setText(str(e))

        x_vals = np.linspace(a, b, 1000)
        y_vals = f(x_vals)

        self.figure.clear()
        ax = self.figure.add_subplot(111)
        ax.plot(x_vals, y_vals, 'b-', label='f(x)')
        ax.axhline(y=0, color='r', linestyle='--')
        if 'result' in locals():
            ax.axvline(x=result, color='g', linestyle='--', label='Root')
        ax.set_xlabel('x')
        ax.set_ylabel('f(x)')
        ax.legend()
        ax.grid(True)
        self.canvas.draw()

if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    sys.exit(app.exec_())
