import PyPDF2
import re
import bs4
import requests

def pdf_to_text(pdf_path: str) -> str:
    """
    Converts a pdf file to text

    Parameters:
    - pdf_path (str): Path to the pdf file

    Returns:
    - text (str): The text extracted from the pdf file
    """

    with open(pdf_path, "rb") as file:
        pdf_reader = PyPDF2.PdfReader(file)

        text = ""

        for page in pdf_reader.pages:
            page_text = ""
            page_text += page.extract_text()

            no_parag = ' '.join(line for line in page_text.split('\n') if len(line.strip()) >= 3)

            filtered_text = str.replace(no_parag, '*', '')
            cleaned_text = re.sub(r'\s+', ' ', filtered_text).strip()  # Reemplazar múltiples espacios por uno solo

            text += cleaned_text + " "  # Agregar un espacio entre páginas

    return text

def wikipedia_to_text(url: str) -> str:
    """
    Extracts text from a Wikipedia page with bs4

    Parameters:
    - url (str): The URL of the Wikipedia page

    Returns:
    - text (str): The text extracted from the Wikipedia page
    """

    response = requests.get(url)
    soup = bs4.BeautifulSoup(response.content, 'html.parser')

    text = soup.find("div", {"id": "bodyContent"}).get_text()

    return text
    


pdf_sindrome_impostor = pdf_to_text("Sindrome_Impostor.pdf")
print(pdf_sindrome_impostor)

wiki = wikipedia_to_text("https://es.wikipedia.org/wiki/S%C3%ADndrome_del_impostor")
print(wiki)