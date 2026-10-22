# 1. Maak de output map aan
mkdir -p output

# 2. Loop door alle PDF bestanden in de huidige map
for file in *.pdf; do
    # Sla het bestand over als het geen PDF is (voor het geval de map leeg is)
    [ -e "$file" ] || continue
    
    echo "Bezig met verwerken van: $file..."
    
    # Stap A: Linearize (opschonen) naar een tijdelijk bestand
    qpdf --linearize "$file" "temp_linear.pdf"
    
    # Stap B: Beveiligen vanuit het tijdelijke bestand naar de output map
    # Pas hier het wachtwoord aan!
    qpdf --encrypt --owner-password="JOUW_WACHTWOORD" --bits=256 --extract=n --print=low -- "temp_linear.pdf" "output/$file"
    
    # Verwijder het tijdelijke bestand
    rm "temp_linear.pdf"
done

echo "Klaar! Alle beveiligde bestanden staan in de map /output"
