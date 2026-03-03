#!/usr/bin/env python3
"""
Empire Coach - Générateur d'icônes simple
Crée des icônes PNG basiques pour tester l'app rapidement.
"""

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    print("❌ Pillow n'est pas installé.")
    print("   Installe-le avec : pip install pillow")
    exit(1)

def create_icon(size, filename):
    """Crée une icône simple avec fond dégradé et lettre E dorée"""
    
    # Créer l'image avec dégradé
    img = Image.new('RGB', (size, size))
    draw = ImageDraw.Draw(img)
    
    # Dégradé simple (du haut gauche au bas droit)
    for y in range(size):
        for x in range(size):
            # Couleur qui évolue du foncé (#07080C) au moins foncé (#0E1018)
            r = int(7 + (14 - 7) * ((x + y) / (size * 2)))
            g = int(8 + (16 - 8) * ((x + y) / (size * 2)))
            b = int(12 + (24 - 12) * ((x + y) / (size * 2)))
            img.putpixel((x, y), (r, g, b))
    
    draw = ImageDraw.Draw(img)
    
    # Cercle doré subtil
    margin = size // 6
    circle_thickness = max(2, size // 80)
    draw.ellipse(
        [margin, margin, size - margin, size - margin],
        outline=(212, 175, 55),  # #D4AF37
        width=circle_thickness
    )
    
    # Lettre "E" dorée
    font_size = size // 2
    try:
        # Essayer différentes fonts serif
        for font_name in ['Georgia', 'Times New Roman', 'Palatino', 'Garamond']:
            try:
                font = ImageFont.truetype(font_name, font_size)
                break
            except:
                continue
        else:
            # Si aucune font trouvée, utiliser la default
            font = ImageFont.load_default()
            print(f"⚠️  Font serif introuvable, utilisation de la police par défaut")
    except:
        font = ImageFont.load_default()
    
    text = "E"
    
    # Centrer le texte
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    x = (size - text_width) // 2
    y = (size - text_height) // 2 - size // 20  # Légèrement vers le haut
    
    # Dessiner le texte en doré
    draw.text((x, y), text, fill=(212, 175, 55), font=font)  # #D4AF37
    
    # Petites particules dorées pour l'effet
    particles = [
        (size // 5, size // 5, 3),
        (size * 4 // 5, size // 6, 2),
        (size // 6, size * 4 // 5, 2),
        (size * 5 // 6, size * 5 // 6, 2),
    ]
    
    for px, py, pr in particles:
        draw.ellipse(
            [px - pr, py - pr, px + pr, py + pr],
            fill=(212, 175, 55, 128)  # #D4AF37 semi-transparent
        )
    
    # Sauvegarder
    img.save(filename, 'PNG')
    return filename

if __name__ == "__main__":
    print("\n" + "="*60)
    print("🎨 EMPIRE COACH - Générateur d'Icônes")
    print("="*60 + "\n")
    
    try:
        # Créer les deux icônes
        print("⏳ Génération de icon-192.png...")
        create_icon(192, 'icon-192.png')
        print("✅ icon-192.png créé")
        
        print("⏳ Génération de icon-512.png...")
        create_icon(512, 'icon-512.png')
        print("✅ icon-512.png créé")
        
        print("\n" + "="*60)
        print("✨ Icônes générées avec succès !")
        print("="*60)
        print("\n💡 Ces icônes sont basiques, parfaites pour tester.")
        print("   Pour un design pro, utilise Figma, Canva ou IA")
        print("   (voir ICONS.md pour plus d'options)\n")
        
    except Exception as e:
        print(f"\n❌ Erreur lors de la génération : {e}")
        print("   Vérifie que Pillow est bien installé : pip install pillow\n")
