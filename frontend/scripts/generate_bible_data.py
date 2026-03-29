#!/usr/bin/env python3
"""Generate sample Bible data for all 66 books in Telugu and English."""
import json

# Book metadata: (bookId, nameEng, nameTel, chapters, versesPerChapter)
BOOKS = [
    # OLD TESTAMENT - LAW
    (1, "Genesis", "ఆదికాండము", [
        ["In the beginning God created the heaven and the earth.",
         "And the earth was without form, and void; and darkness was upon the face of the deep.",
         "And God said, Let there be light: and there was light.",
         "And God saw the light, that it was good: and God divided the light from the darkness.",
         "And God called the light Day, and the darkness he called Night.",
         "And God said, Let there be a firmament in the midst of the waters.",
         "And God made the firmament, and divided the waters which were under the firmament from the waters which were above the firmament.",
         "And God called the firmament Heaven. And the evening and the morning were the second day.",
         "And God said, Let the waters under the heaven be gathered together unto one place.",
         "And God called the dry land Earth; and the gathering together of the waters called he Seas."],
        ["Thus the heavens and the earth were finished, and all the host of them.",
         "And on the seventh day God ended his work which he had made.",
         "And God blessed the seventh day, and sanctified it.",
         "These are the generations of the heavens and of the earth when they were created.",
         "And every plant of the field before it was in the earth, and every herb of the field before it grew.",
         "But there went up a mist from the earth, and watered the whole face of the ground.",
         "And the LORD God formed man of the dust of the ground, and breathed into his nostrils the breath of life."],
        ["Now the serpent was more subtil than any beast of the field which the LORD God had made.",
         "And the woman said unto the serpent, We may eat of the fruit of the trees of the garden.",
         "But of the fruit of the tree which is in the midst of the garden, God hath said, Ye shall not eat of it.",
         "And the serpent said unto the woman, Ye shall not surely die.",
         "For God doth know that in the day ye eat thereof, then your eyes shall be opened."],
    ], [
        ["ఆదియందు దేవుడు భూమ్యాకాశములను సృజించెను.",
         "భూమి నిరాకారముగాను శూన్యముగాను ఉండెను; చీకటి అగాధజలము పైన కమ్మియుండెను.",
         "దేవుడు వెలుగు కమ్మని పలికెను; వెలుగు కలిగెను.",
         "వెలుగు మంచిదైనట్టు దేవుడు చూచెను; దేవుడు వెలుగును చీకటిని వేరుపరచెను.",
         "దేవుడు వెలుగునకు పగలనియు, చీకటికి రాత్రి అనియు పేరు పెట్టెను.",
         "మరియు దేవుడు జలముల మధ్య విశాలము కలిగి, జలములను జలములను వేరుచేయునదని పలికెను.",
         "దేవుడు ఆ విశాలమును చేసి, విశాలము క్రింది జలములను విశాలము పైనున్న జలములను వేరుపరచెను.",
         "దేవుడు ఆ విశాలమునకు ఆకాశమని పేరు పెట్టెను. అస్తమయమును ఉదయమును కలుగగా రెండవ దినము ఆయెను.",
         "దేవుడు ఆకాశముక్రింది జలములు ఒకచోటికి పోగై పొడినేల కనబడునుగాక అని పలికెను.",
         "దేవుడు పొడినేలకు భూమి అనియు, జలరాశికి సముద్రములనియు పేరు పెట్టెను."],
        ["ఆ ప్రకారము భూమ్యాకాశములును, వాటి సర్వసమూహమును సంపూర్ణమాయెను.",
         "దేవుడు తాను చేసిన తన పనిని ఏడవ దినమందు సంపూర్ణ చేసెను.",
         "కాబట్టి దేవుడు ఏడవ దినమును ఆశీర్వదించి పరిశుద్ధపరచెను.",
         "భూమ్యాకాశములు సృజింపబడిన నాటి వృత్తాంతము ఇది.",
         "పొలములో మొక్కయు భూమిమీద గడ్డియు మొలవలేదు.",
         "అయితే భూమిలోనుండి మంచు లేచి నేలయంతటిమీద తడిపెను.",
         "దేవుడైన యెహోవా నేలమంటితో మనుష్యుని రూపించి వాని నాసికారంధ్రములలో జీవవాయువును ఊదెను."],
        ["దేవుడైన యెహోవా చేసిన సమస్త భూజంతువులలో సర్పము మిక్కిలి యుక్తిగలది.",
         "అందుకు స్త్రీ ఆ సర్పముతో ఈ తోటలోని చెట్ల ఫలములను మేము తినవచ్చును.",
         "అయితే ఈ తోట మధ్యనున్న చెట్టు ఫలమునుగూర్చి మీరు చావకుండునట్లు దాని తినకూడదు.",
         "అందుకు సర్పము మీరు చావనే చావరు అని స్త్రీతో చెప్పెను.",
         "ఏలయనగా మీరు వాటిని తిను దినమున మీ కన్నులు తెరవబడునని దేవునికి తెలియును."],
    ]),
    (2, "Exodus", "నిర్గమకాండము", [
        ["Now these are the names of the children of Israel, which came into Egypt.",
         "Reuben, Simeon, Levi, and Judah.",
         "Issachar, Zebulun, and Benjamin.",
         "Dan, and Naphtali, Gad, and Asher.",
         "And all the souls that came out of the loins of Jacob were seventy souls."],
    ], [
        ["ఇశ్రాయేలు కుమారులలో ఐగుప్తునకు వచ్చినవారి నామములు ఇవి.",
         "రూబేను షిమ్యోను లేవి యూదా.",
         "ఇశ్శాఖారు జెబూలూను బెన్యామీను.",
         "దాను నఫ్తాలి గాదు ఆషేరు.",
         "యాకోబు గర్భమునుండి వచ్చిన వారందరు డెబ్బదిమంది."],
    ]),
    (3, "Leviticus", "లేవీయకాండము", [
        ["And the LORD called unto Moses, and spake unto him out of the tabernacle of the congregation.",
         "Speak unto the children of Israel, and say unto them.",
         "If his offering be a burnt sacrifice of the herd, let him offer a male without blemish.",
         "And he shall put his hand upon the head of the burnt offering; and it shall be accepted for him.",
         "And he shall kill the bullock before the LORD."],
    ], [
        ["యెహోవా మోషేను పిలిచి ప్రత్యక్షపు గుడారములోనుండి అతనితో ఇట్లనెను.",
         "ఇశ్రాయేలీయులతో ఇట్లు చెప్పుము.",
         "అతని అర్పణ పశువుల మందలోనిదైన దహనబలి అయినయెడల నిర్దోషమైన మగదాని అర్పింపవలెను.",
         "అతడు ఆ దహనబలి పశువు తలమీద చేయి ఉంచవలెను; అది అతనికొరకు ప్రాయశ్చిత్తముగా అంగీకరించబడును.",
         "అతడు యెహోవా సన్నిధిని ఆ కోడెదూడను వధింపవలెను."],
    ]),
    (4, "Numbers", "సంఖ్యాకాండము", [
        ["And the LORD spake unto Moses in the wilderness of Sinai.",
         "Take ye the sum of all the congregation of the children of Israel.",
         "From twenty years old and upward, all that are able to go forth to war in Israel.",
         "And with you there shall be a man of every tribe.",
         "These are the names of the men that shall stand with you."],
    ], [
        ["ఇశ్రాయేలీయులు ఐగుప్తు దేశములోనుండి బయలుదేరిన రెండవ సంవత్సరము.",
         "ఇశ్రాయేలీయుల సమాజమంతటి లెక్క చూడుము.",
         "ఇరువది ఏండ్లు మొదలుకొని పైవారందరిని యుద్ధమునకు పోగలవారిని లెక్కించుము.",
         "ప్రతి గోత్రమునకు ఒక్కడు మీతో కూడ ఉండవలెను.",
         "మీతో కూడ నిలువవలసిన పురుషుల నామములు ఇవి."],
    ]),
    (5, "Deuteronomy", "ద్వితీయోపదేశకాండము", [
        ["These be the words which Moses spake unto all Israel on this side Jordan in the wilderness.",
         "There are eleven days journey from Horeb by the way of mount Seir unto Kadeshbarnea.",
         "And it came to pass in the fortieth year, in the eleventh month.",
         "After he had slain Sihon the king of the Amorites.",
         "On this side Jordan, in the land of Moab, began Moses to declare this law."],
    ], [
        ["యొర్దానుకు ఈవలనున్న అరణ్యములో మోషే ఇశ్రాయేలీయులందరితో చెప్పిన మాటలు ఇవి.",
         "హోరేబునుండి శేయీరు కొండమార్గమునబడి కాదేషు బర్నేయవరకు పదునొకండు దినముల ప్రయాణము.",
         "నలువదియవ సంవత్సరము పదునొకండవ నెలలో జరిగెను.",
         "అతడు హెష్బోనులో నివసించిన అమోరీయుల రాజైన సీహోనును చంపిన తరువాత.",
         "యొర్దానుకు ఈవలనున్న మోయాబు దేశములో మోషే ఈ ధర్మశాస్త్రమును వివరింపసాగెను."],
    ]),
    # HISTORY
    (6, "Joshua", "యెహోషువ", [["After the death of Moses the servant of the LORD it came to pass.", "Moses my servant is dead; now therefore arise, go over this Jordan.", "Every place that the sole of your foot shall tread upon, that have I given unto you.", "Be strong and of a good courage.", "Have not I commanded thee? Be strong and of a good courage; be not afraid."]], [["యెహోవా సేవకుడైన మోషే మృతినొందిన తరువాత జరిగినదేమనగా.", "నా సేవకుడైన మోషే మృతినొందెను గనుక నీవు లేచి ఈ యొర్దాను దాటుము.", "మీ అరికాలు త్రొక్కు ప్రతిచోటును నేను మీకిచ్చియున్నాను.", "నిబ్బరముగలిగి ధైర్యముగా ఉండుము.", "నేను నీకాజ్ఞాపించినది నిబ్బరముగలిగి ధైర్యముగా ఉండుము; భయపడకుము."]]),
    (7, "Judges", "న్యాయాధిపతులు", [["Now after the death of Joshua it came to pass.", "And Judah said unto Simeon his brother, Come up with me into my lot.", "And the LORD was with Judah; and he drave out the inhabitants of the mountain.", "And Caleb said, He that smiteth Kirjathsepher, and taketh it.", "And Othniel the son of Kenaz took it."]], [["యెహోషువ మరణమైన తరువాత జరిగినదేమనగా.", "యూదా తన సహోదరుడైన షిమ్యోనుతో నాకు చీట్లవలన వచ్చిన భూమికి రమ్ము.", "యెహోవా యూదాకు తోడైయుండెను; అతడు కొండ దేశనివాసులను వెళ్లగొట్టెను.", "కిర్యత్సేఫెరును కొట్టి పట్టుకొనువానికి కాలేబు చెప్పెను.", "కనజు కుమారుడైన ఒత్నీయేలు దాని పట్టుకొనెను."]]),
    (8, "Ruth", "రూతు", [["Now it came to pass in the days when the judges ruled, that there was a famine in the land.", "And a certain man of Bethlehemjudah went to sojourn in the country of Moab.", "And the name of the man was Elimelech, and the name of his wife Naomi.", "And they came into the country of Moab, and continued there.", "And Mahlon and Chilion died also both of them."]], [["న్యాయాధిపతులు పాలించిన దినములలో దేశములో కరవు కలిగెను.", "బేత్లెహేము యూదాలో ఒకడు తన భార్యతో మోయాబు దేశమునకు వెళ్లెను.", "ఆ మనుష్యుని పేరు ఎలీమెలెకు; అతని భార్యపేరు నయోమి.", "వారు మోయాబు దేశమునకు వచ్చి అక్కడ నివసించిరి.", "మహ్లోను కిల్యోను అను ఇద్దరును మృతినొందిరి."]]),
    (9, "1 Samuel", "1 సమూయేలు", [["Now there was a certain man of Ramathaimzophim.", "And he had two wives; the name of the one was Hannah.", "And this man went up out of his city yearly to worship the LORD of hosts in Shiloh.", "And her adversary also provoked her sore.", "But unto Hannah he gave a worthy portion; for he loved Hannah."]], [["రామాతయిం సోఫీములో ఒక మనుష్యుడుండెను.", "అతనికి ఇద్దరు భార్యలుండిరి; ఒకదాని పేరు హన్నా.", "ఈ మనుష్యుడు ఏటేట షిలోహులో సైన్యములకధిపతియగు యెహోవాను ఆరాధించుటకు వెళ్ళెను.", "దాని పోటికత్తెయు దానికి విసుగు కలుగజేయుచుండెను.", "అయితే హన్నాను ప్రేమించెను గనుక ఆమెకు ప్రశస్తమైన భాగమిచ్చెను."]]),
    (10, "2 Samuel", "2 సమూయేలు", [["Now it came to pass after the death of Saul.", "David enquired of the LORD, saying, Shall I go up into any of the cities of Judah?", "And the LORD said unto him, Go up. And David said, Whither shall I go up?", "So David went up thither, and his two wives also.", "And the men of Judah came, and there they anointed David king over the house of Judah."]], [["సౌలు మరణమైన తరువాత జరిగినదేమనగా.", "దావీదు యెహోవాను విచారణ చేసి యూదా పట్టణములలో ఏదైనను నేను వెళ్ళవలెనా అని అడిగెను.", "యెహోవా వెళ్ళుమని చెప్పెను. దావీదు ఎక్కడికి వెళ్ళవలెనని అడిగెను.", "దావీదు అక్కడికి వెళ్ళెను; అతని ఇద్దరు భార్యలును వెళ్ళిరి.", "యూదా మనుష్యులు వచ్చి అక్కడ దావీదును యూదా వంశమునకు రాజుగా అభిషేకించిరి."]]),
    (11, "1 Kings", "1 రాజులు", [["Now king David was old and stricken in years.", "His servants said unto him, Let there be sought for my lord the king a young virgin.", "So they sought for a fair damsel throughout all the coasts of Israel.", "And the damsel was very fair, and cherished the king.", "And Adonijah the son of Haggith exalted himself, saying, I will be king."]], [["దావీదు రాజు వయసు చాలిన ముసలివాడాయెను.", "అతని సేవకులు ప్రభువైన రాజుకొరకు యౌవనురాలైన కన్యకను వెదకవలెనని చెప్పిరి.", "ఇశ్రాయేలు దేశమంతట సుందరమైన కన్యకను వెదకిరి.", "ఆ కన్యక మిక్కిలి సౌందర్యము గలది; ఆమె రాజును ఆదరించెను.", "హగ్గీతు కుమారుడైన అదోనీయా నేను రాజునగుదునని చెప్పుకొని తన్ను తాను హెచ్చించుకొనెను."]]),
    (12, "2 Kings", "2 రాజులు", [["Then Moab rebelled against Israel after the death of Ahab.", "And Ahaziah fell down through a lattice in his upper chamber.", "And he sent messengers to inquire of Baalzebub the god of Ekron.", "But the angel of the LORD said to Elijah, Arise, go up to meet the messengers.", "And Elijah answered, If I be a man of God, let fire come down from heaven."]], [["అహాబు మరణమైన తరువాత మోయాబు ఇశ్రాయేలుమీద తిరుగుబాటు చేసెను.", "అహజ్యా తన మేడగదిలోని ఊచలగుండ క్రిందపడెను.", "అతడు ఎక్రోను దేవుడైన బయల్జెబూబును విచారణచేయుడని దూతలను పంపెను.", "అయితే యెహోవా దూత తిష్బీయుడైన ఏలీయాతో ఆ దూతలను ఎదుర్కొనుటకు లెమ్మనెను.", "ఏలీయా నేను దేవుని మనుష్యుడనైతే ఆకాశమునుండి అగ్ని దిగునుగాక అని చెప్పెను."]]),
    (13, "1 Chronicles", "1 దినవృత్తాంతములు", [["Adam, Sheth, Enosh.", "Kenan, Mahalaleel, Jered.", "Henoch, Methuselah, Lamech.", "Noah, Shem, Ham, and Japheth.", "The sons of Japheth; Gomer, and Magog, and Madai, and Javan."]], [["ఆదాము షేతు ఎనోషు.", "కేయినాను మహలలేలు యెరెదు.", "హనోకు మెతూషెల లెమెకు.", "నోవహు షేము హాము యాపెతు.", "యాపెతు కుమారులు గోమెరు మాగోగు మాదయి యావాను."]]),
    (14, "2 Chronicles", "2 దినవృత్తాంతములు", [["And Solomon the son of David was strengthened in his kingdom.", "Then Solomon spake unto all Israel, to the captains of thousands.", "So Solomon, and all the congregation with him, went to the high place.", "In that night did God appear unto Solomon.", "And Solomon said unto God, Thou hast shewed great mercy unto David my father."]], [["దావీదు కుమారుడైన సొలొమోను తన రాజ్యమందు బలపరచబడెను.", "సొలొమోను ఇశ్రాయేలీయులందరితో సహస్రాధిపతులతో మాటలాడెను.", "సొలొమోనును అతనితో ఉన్న సమాజమంతయు ఉన్నతస్థలమునకు వెళ్ళిరి.", "ఆ రాత్రియందు దేవుడు సొలొమోనునకు కనబడెను.", "సొలొమోను దేవునితో నా తండ్రియైన దావీదునకు నీవు గొప్ప కృప చూపించితివి అని చెప్పెను."]]),
    (15, "Ezra", "ఎజ్రా", [["Now in the first year of Cyrus king of Persia.", "The LORD stirred up the spirit of Cyrus king of Persia.", "Thus saith Cyrus king of Persia, The LORD God of heaven hath given me all the kingdoms.", "Who is there among you of all his people? His God be with him.", "Then rose up the chief of the fathers of Judah and Benjamin."]], [["పారసీకదేశపు రాజైన కోరెషు మొదటి సంవత్సరమందు.", "యెహోవా పారసీకదేశపు రాజైన కోరెషు ఆత్మను ప్రేరేపించెను.", "పారసీకదేశపు రాజైన కోరెషు ఆకాశదేవుడైన యెహోవా లోకమందలి రాజ్యములన్నిటిని నాకిచ్చెను.", "ఆయన జనులలో మీయందు ఎవరున్నారు? వాని దేవుడు వానికి తోడైయుండును గాక.", "అప్పుడు యూదా బెన్యామీనుల పితరుల ప్రధానులు లేచిరి."]]),
    (16, "Nehemiah", "నెహెమ్యా", [["The words of Nehemiah the son of Hachaliah.", "And it came to pass, when I heard these words, I sat down and wept.", "And said, I beseech thee, O LORD God of heaven.", "The great and terrible God, that keepeth covenant and mercy.", "Let thine ear now be attentive, and thine eyes open."]], [["హకల్యా కుమారుడైన నెహెమ్యా మాటలు.", "ఈ మాటలు విని నేను కూర్చుండి యేడ్చితిని.", "ఆకాశదేవుడైన యెహోవా నేను నిన్ను వేడుకొనుచున్నాను.", "నిబంధనను కృపను కాపాడు మహా భయంకరుడవైన దేవా.", "నీ సేవకుని ప్రార్థన వినుటకు నీ చెవి ఆలకించి నీ కన్నులు తెరచుము."]]),
    (17, "Esther", "ఎస్తేరు", [["Now it came to pass in the days of Ahasuerus.", "That in those days, when the king Ahasuerus sat on the throne.", "In the third year of his reign, he made a feast unto all his princes.", "Also Vashti the queen made a feast for the women.", "On the seventh day, the heart of the king was merry with wine."]], [["అహష్వేరోషు దినములలో జరిగినదేమనగా.", "ఆ దినములలో అహష్వేరోషు రాజు సింహాసనమునకూర్చుండెను.", "అతని యేలుబడియందు మూడవ సంవత్సరమున అతని సమస్త అధిపతులకు విందుచేసెను.", "రాణియైన వష్తియు స్త్రీలకు విందు చేసెను.", "ఏడవ దినమున రాజు హృదయము ద్రాక్షారసముచేత ఆనందమాయెను."]]),
    # POETRY
    (18, "Job", "యోబు", [["There was a man in the land of Uz, whose name was Job.", "And that man was perfect and upright, and one that feared God.", "His substance also was seven thousand sheep, and three thousand camels.", "And his sons went and feasted in their houses.", "And Job sent and sanctified them, and rose up early in the morning."]], [["ఊజు దేశమందు యోబు అను ఒక మనుష్యుడుండెను.", "ఆ మనుష్యుడు యథార్థవంతుడును న్యాయస్థుడును దేవునియందు భయభక్తులు గలవాడును.", "అతని ఆస్తి ఏడువేల గొఱ్ఱెలు మూడువేల ఒంటెలు.", "అతని కుమారులు వారివారి ఇండ్లలో విందుచేయుచుండిరి.", "యోబు వారిని పిలిపించి పవిత్రపరచి ఉదయమునే లేచెను."]]),
    (19, "Psalms", "కీర్తనలు", [
        ["Blessed is the man that walketh not in the counsel of the ungodly.",
         "But his delight is in the law of the LORD; and in his law doth he meditate day and night.",
         "And he shall be like a tree planted by the rivers of water.",
         "The ungodly are not so: but are like the chaff which the wind driveth away.",
         "Therefore the ungodly shall not stand in the judgment.",
         "For the LORD knoweth the way of the righteous: but the way of the ungodly shall perish."],
        ["The LORD is my shepherd; I shall not want.",
         "He maketh me to lie down in green pastures: he leadeth me beside the still waters.",
         "He restoreth my soul: he leadeth me in the paths of righteousness for his name's sake.",
         "Yea, though I walk through the valley of the shadow of death, I will fear no evil.",
         "Thou preparest a table before me in the presence of mine enemies.",
         "Surely goodness and mercy shall follow me all the days of my life."],
        ["The LORD is my light and my salvation; whom shall I fear?",
         "When the wicked came upon me to eat up my flesh, my enemies and my foes, they stumbled.",
         "Though an host should encamp against me, my heart shall not fear.",
         "One thing have I desired of the LORD, that will I seek after.",
         "For in the time of trouble he shall hide me in his pavilion."],
    ], [
        ["భక్తిహీనుల ఆలోచన చొప్పున నడువక పాపుల మార్గమున నిలువక వాడు ధన్యుడు.",
         "యెహోవా ధర్మశాస్త్రమునందు అతడు ఆనందించును. దివారాత్రము దానిని ధ్యానించును.",
         "అతడు నీటి కాలువల ప్రక్కన నాటబడి ఆకు వాడక తన కాలమందు ఫలమిచ్చు చెట్టువలె నుండును.",
         "భక్తిహీనులు అట్లుండరు, గాలికి ఎగురగొట్టబడు పొట్టువలె నుందురు.",
         "కాబట్టి న్యాయవిమర్శలో భక్తిహీనులును నీతిమంతుల సభలో పాపులును నిలువలేరు.",
         "నీతిమంతుల మార్గమును యెహోవా జ్ఞాపకముంచును భక్తిహీనుల మార్గము నాశనమగును."],
        ["యెహోవా నా కాపరి; నాకు లేమి కలుగదు.",
         "పచ్చిక బయళ్లలో ఆయన నన్ను పరుండజేయును. సేదదీర్చు జలములయొద్దకు నన్ను నడిపించును.",
         "ఆయన నా ప్రాణమును తెప్పరిల్లజేయును. తన నామమునుబట్టి నీతిమార్గములలో నన్ను నడిపించును.",
         "గాఢాంధకారపు లోయలో నేను సంచరించినను ఏ అపాయమునకు భయపడను.",
         "నా శత్రువులయెదుట నీవు నాకు భోజనము సిద్ధపరచుదువు.",
         "నా జీవితకాలమంతయు నన్ను శుభమును కృపయును వెంబడించును."],
        ["యెహోవా నా వెలుగును నా రక్షణయునైయున్నాడు; నేనెవరికి భయపడుదును?",
         "నా శరీరమును తినుటకు దుష్టులు నామీదికి వచ్చినప్పుడు వారు తొట్రిల్లి పడిరి.",
         "సేన నామీద దిగినను నా హృదయము భయపడదు.",
         "ఒక్కటి నేను యెహోవాను అడిగియున్నాను దానినే నేను వెదకుచున్నాను.",
         "ఆపద కాలమందు ఆయన తన పర్ణశాలలో నన్ను దాచును."],
    ]),
    (20, "Proverbs", "సామెతలు", [
        ["The proverbs of Solomon the son of David, king of Israel.",
         "To know wisdom and instruction; to perceive the words of understanding.",
         "To receive the instruction of wisdom, justice, and judgment, and equity.",
         "To give subtilty to the simple, to the young man knowledge and discretion.",
         "The fear of the LORD is the beginning of knowledge.",
         "My son, hear the instruction of thy father, and forsake not the law of thy mother."],
    ], [
        ["ఇశ్రాయేలు రాజగు దావీదు కుమారుడైన సొలొమోను సామెతలు.",
         "జ్ఞానమును ఉపదేశమును తెలిసికొనుటకును.",
         "జ్ఞానముయొక్క బోధను నీతిన్యాయసమతలను చేపట్టుటకును.",
         "జ్ఞానహీనులకు బుద్ధినియ్యుటకును యవనస్థులకు తెలివిని వివేచనను ఇయ్యుటకును.",
         "యెహోవాయందు భయభక్తులు కలిగియుండుటయే జ్ఞానమునకు ఆరంభము.",
         "నా కుమారుడా, నీ తండ్రి ఉపదేశమును ఆలకింపుము నీ తల్లి చెప్పు బోధను త్రోసివేయకుము."],
    ]),
    (21, "Ecclesiastes", "ప్రసంగి", [["The words of the Preacher, the son of David, king in Jerusalem.", "Vanity of vanities, saith the Preacher, vanity of vanities; all is vanity.", "What profit hath a man of all his labour which he taketh under the sun?", "One generation passeth away, and another generation cometh.", "The sun also ariseth, and the sun goeth down."]], [["యెరూషలేములో రాజైన దావీదు కుమారుడగు ప్రసంగి మాటలు.", "వ్యర్థమని ప్రసంగి చెప్పుచున్నాడు, వ్యర్థము; సమస్తము వ్యర్థమే.", "సూర్యుని క్రింద నరుడు పడు కష్టమంతటిచేత వానికి లాభమేమి?", "ఒక తరము గతించిపోవును మరి ఒక తరము వచ్చును.", "సూర్యుడు ఉదయించును సూర్యుడు అస్తమించును."]]),
    (22, "Song of Solomon", "పరమగీతము", [["The song of songs, which is Solomon's.", "Let him kiss me with the kisses of his mouth.", "Draw me, we will run after thee.", "I am black, but comely, O ye daughters of Jerusalem.", "Look not upon me, because I am black."]], [["సొలొమోను రచించిన పరమగీతము.", "అతడు తన నోటి ముద్దులతో నన్ను ముద్దుపెట్టుకొనును గాక.", "నన్ను ఆకర్షించుము మేము నీ వెంట పరుగెత్తుదుము.", "యెరూషలేము కుమార్తెలారా, నేను నల్లనిదానను గాని అందమైనదానను.", "నేను నల్లనిదానను గనుక నన్ను చూడకుడి."]]),
    # PROPHECY
    (23, "Isaiah", "యెషయా", [["The vision of Isaiah the son of Amoz, which he saw concerning Judah and Jerusalem.", "Hear, O heavens, and give ear, O earth: for the LORD hath spoken.", "I have nourished and brought up children, and they have rebelled against me.", "The ox knoweth his owner, and the donkey his master's crib.", "Ah sinful nation, a people laden with iniquity."]], [["ఆమోజు కుమారుడైన యెషయాకు యూదా యెరూషలేములనుగూర్చి కలిగిన దర్శనము.", "ఆకాశమా, ఆలకించుము; భూమీ, చెవియొగ్గుము; యెహోవా మాటలాడుచున్నాడు.", "నేను పిల్లలను పెంచి పెద్దచేసితిని వారు నామీద తిరుగుబాటు చేసిరి.", "ఎద్దు తన యజమానుని ఎరుగును, గాడిద తన యజమాని తొట్టిని ఎరుగును.", "అయ్యో, పాపముచేయు జనమా, దోషభరితమైన ప్రజలారా."]]),
    (24, "Jeremiah", "యిర్మీయా", [["The words of Jeremiah the son of Hilkiah.", "Then the word of the LORD came unto me, saying.", "Before I formed thee in the belly I knew thee.", "Then said I, Ah, Lord GOD! behold, I cannot speak: for I am a child.", "But the LORD said unto me, Say not, I am a child."]], [["హిల్కీయా కుమారుడైన యిర్మీయా మాటలు.", "యెహోవా వాక్కు నాకు ప్రత్యక్షమై ఇట్లనెను.", "గర్భమందు నిన్ను రూపించక మునుపే నేను నిన్నెరిగితిని.", "అందుకు నేను అయ్యో ప్రభువా, నేను బాలుడను నాకు మాటలాడ చేతకాదు అంటిని.", "అయితే యెహోవా నేను బాలుడనని చెప్పకుమని నాతో అనెను."]]),
    (25, "Lamentations", "విలాపవాక్యములు", [["How doth the city sit solitary, that was full of people!", "She weepeth sore in the night, and her tears are on her cheeks.", "Judah is gone into captivity because of affliction.", "The ways of Zion do mourn, because none come to the solemn feasts.", "Her adversaries are the chief, her enemies prosper."]], [["జనులతో నిండియుండిన ఈ పట్టణము ఏకాంతముగా ఎట్లు కూర్చుండెను!", "రాత్రివేళ ఆమె బహుగా ఏడ్చుచున్నది; ఆమె కన్నీళ్లు చెంపలమీద నున్నవి.", "బాధవలనను దాస్యమువలనను యూదా చెరగా పోయెను.", "సియోను మార్గములు దుఃఖించుచున్నవి; పండుగలకు ఎవరును రారు.", "దాని శత్రువులు ప్రధానులైరి; దాని విరోధులు వర్ధిల్లుచున్నారు."]]),
    (26, "Ezekiel", "యెహెజ్కేలు", [["Now it came to pass in the thirtieth year.", "The heavens were opened, and I saw visions of God.", "The word of the LORD came expressly unto Ezekiel the priest.", "And I looked, and behold, a whirlwind came out of the north.", "Also out of the midst thereof came the likeness of four living creatures."]], [["ముప్పదియవ సంవత్సరమందు జరిగినదేమనగా.", "ఆకాశము తెరవబడగా దేవుని దర్శనములు నాకు కలిగెను.", "యెహోవా వాక్కు యాజకుడైన యెహెజ్కేలునకు ప్రత్యక్షమాయెను.", "నేను చూడగా ఉత్తర దిక్కునుండి బహు వేగముగల ఒక పెనుగాలి వచ్చుచుండెను.", "దాని మధ్యనుండి నాలుగు జీవుల రూపము కనబడెను."]]),
    (27, "Daniel", "దానియేలు", [["In the third year of the reign of Jehoiakim king of Judah.", "And the Lord gave Jehoiakim king of Judah into his hand.", "And the king spake unto Ashpenaz the master of his eunuchs.", "Children in whom was no blemish, but well favoured.", "Daniel purposed in his heart that he would not defile himself."]], [["యూదా రాజైన యెహోయాకీము ఏలుబడిలో మూడవ సంవత్సరమున.", "ప్రభువు యూదా రాజైన యెహోయాకీమును అతని చేతికి అప్పగించెను.", "రాజు తన నపుంసకుల అధిపతియైన అష్పనజుతో చెప్పెను.", "ఏ దోషమును లేని సౌందర్యవంతులైన యవనస్థులను.", "దానియేలు తన్నుతాను అపవిత్రపరచుకొనకూడదని తన హృదయమందు నిశ్చయించుకొనెను."]]),
    (28, "Hosea", "హోషేయ", [["The word of the LORD that came unto Hosea.", "Go, take unto thee a wife.", "So he went and took Gomer the daughter of Diblaim.", "And the LORD said unto him, Call his name Jezreel.", "Yet the number of the children of Israel shall be as the sand of the sea."]], [["హోషేయకు ప్రత్యక్షమైన యెహోవా వాక్కు.", "నీవు వెళ్లి ఒక భార్యను తెచ్చుకొనుము.", "అతడు వెళ్ళి దిబ్లయీము కుమార్తెయైన గోమెరును తెచ్చుకొనెను.", "యెహోవా అతనితో వానికి యెజ్రెయేలు అని పేరు పెట్టుమనెను.", "ఇశ్రాయేలీయుల సంఖ్య సముద్రపు ఇసుకవలె ఉండును."]]),
    (29, "Joel", "యోవేలు", [["The word of the LORD that came to Joel the son of Pethuel.", "Hear this, ye old men, and give ear.", "That which the palmerworm hath left hath the locust eaten.", "Awake, ye drunkards, and weep.", "For a nation is come up upon my land."]], [["పెతూయేలు కుమారుడైన యోవేలునకు ప్రత్యక్షమైన యెహోవా వాక్కు.", "పెద్దలారా, ఈ మాట ఆలకించుడి; దేశనివాసులారా, చెవియొగ్గుడి.", "గొంగళి పురుగు తిన్నది తక్షిణ మిడతలు తినెను.", "త్రాగుబోతులారా, మేల్కొని యేడ్వుడి.", "బలమైన జనము నా దేశముమీదికి వచ్చెను."]]),
    (30, "Amos", "ఆమోసు", [["The words of Amos, who was among the herdmen of Tekoa.", "And he said, The LORD will roar from Zion.", "For three transgressions of Damascus, and for four.", "Thus saith the LORD; For three transgressions of Gaza.", "But I will send a fire on the wall of Gaza."]], [["తెకోవ గొఱ్ఱెల కాపరులలో ఒకడైన ఆమోసు మాటలు.", "యెహోవా సియోనులో నుండి గర్జించును అని అతడు చెప్పెను.", "దమస్కు చేసిన మూడు అతిక్రమములనుబట్టియు నాలుగు అతిక్రమములనుబట్టియు.", "యెహోవా ఇట్లనుచున్నాడు గాజా చేసిన మూడు అతిక్రమములనుబట్టి.", "నేను గాజా ప్రాకారములమీద అగ్ని పంపెదను."]]),
    (31, "Obadiah", "ఓబద్యా", [["The vision of Obadiah. Thus saith the Lord GOD concerning Edom.", "Behold, I have made thee small among the heathen.", "The pride of thine heart hath deceived thee.", "Though thou exalt thyself as the eagle.", "Shall I not in that day destroy the wise men out of Edom?"]], [["ఓబద్యాకు కలిగిన దర్శనము. ఎదోమునుగూర్చి ప్రభువైన యెహోవా సెలవిచ్చునదేమనగా.", "జనముల మధ్య నిన్ను అల్పునిగా చేసియున్నాను.", "నీ హృదయ గర్వము నిన్ను మోసపుచ్చెను.", "నీవు పక్షిరాజువలె ఎంత ఎత్తుగా ఎగిరినను.", "ఆ దినమందు ఎదోములోనుండి జ్ఞానులను నేను నశింపజేయుదును."]]),
    (32, "Jonah", "యోనా", [["Now the word of the LORD came unto Jonah the son of Amittai.", "Arise, go to Nineveh, that great city.", "But Jonah rose up to flee unto Tarshish.", "But the LORD sent out a great wind into the sea.", "Then the mariners were afraid, and cried every man unto his god."]], [["అమిత్తయి కుమారుడైన యోనాకు యెహోవా వాక్కు ప్రత్యక్షమై.", "నీవు లేచి ఆ మహా పట్టణమైన నీనెవెకు వెళ్ళుము.", "అయితే యోనా తర్షీషునకు పారిపోవుటకు లేచెను.", "అయితే యెహోవా సముద్రముమీద బహు వేగముగల గాలిని పంపెను.", "నావికులు భయపడి ఎవరి దేవునికి వారు మొఱ్ఱపెట్టిరి."]]),
    (33, "Micah", "మీకా", [["The word of the LORD that came to Micah.", "Hear, all ye people; hearken, O earth.", "For, behold, the LORD cometh forth out of his place.", "And the mountains shall be molten under him.", "For the transgression of Jacob is all this."]], [["మీకాకు ప్రత్యక్షమైన యెహోవా వాక్కు.", "జనులారా, మీరందరు ఆలకించుడి; భూమీ, చెవియొగ్గుము.", "యెహోవా తన స్థలమునుండి బయలుదేరి వచ్చుచున్నాడు.", "ఆయన క్రింద పర్వతములు కరిగిపోవును.", "ఇదంతయు యాకోబు అతిక్రమము నిమిత్తమే."]]),
    (34, "Nahum", "నహూము", [["The burden of Nineveh. The book of the vision of Nahum.", "God is jealous, and the LORD revengeth.", "The LORD is slow to anger, and great in power.", "He rebuketh the sea, and maketh it dry.", "The mountains quake at him, and the hills melt."]], [["నీనెవెను గూర్చిన దేవోక్తి. ఎల్కోషీయుడైన నహూము దర్శన గ్రంథము.", "దేవుడు రోషముగలవాడు; యెహోవా ప్రతిదండన చేయువాడు.", "యెహోవా దీర్ఘశాంతుడు మహాబలము గలవాడు.", "ఆయన సముద్రమును గద్దించి దాని ఎండిపోజేయును.", "పర్వతములు ఆయన యెదుట కంపించును; కొండలు కరిగిపోవును."]]),
    (35, "Habakkuk", "హబక్కూకు", [["The burden which Habakkuk the prophet did see.", "O LORD, how long shall I cry, and thou wilt not hear!", "Why dost thou shew me iniquity, and cause me to behold grievance?", "Therefore the law is slacked, and judgment doth never go forth.", "Behold ye among the heathen, and regard, and wonder marvellously."]], [["ప్రవక్తయైన హబక్కూకునకు ప్రత్యక్షమైన దేవోక్తి.", "యెహోవా, నేనెంతకాలము మొఱ్ఱపెట్టుచుండగా నీవు ఆలకింపకుందువు?", "నీవు నాకు దోషమును ఎందుకు చూపించుచున్నావు?", "కాబట్టి ధర్మశాస్త్రము నిర్బలమైనది; న్యాయము జరుగుటలేదు.", "జనములలో చూడుడి, ఆలోచించుడి, ఆశ్చర్యపడుడి."]]),
    (36, "Zephaniah", "జెఫన్యా", [["The word of the LORD which came unto Zephaniah.", "I will utterly consume all things from off the land.", "I will consume man and beast.", "I will also stretch out mine hand upon Judah.", "And them that worship the host of heaven upon the housetops."]], [["జెఫన్యాకు ప్రత్యక్షమైన యెహోవా వాక్కు.", "భూమిమీదనున్న సమస్తమును నేను బొత్తిగా నశింపజేసెదను.", "మనుష్యులను జంతువులను నేను నశింపజేసెదను.", "యూదామీద నా చేయి చాపెదను.", "మేడలమీద ఆకాశ సైన్యమును పూజించువారిని నశింపజేసెదను."]]),
    (37, "Haggai", "హగ్గయి", [["In the second year of Darius the king.", "Thus speaketh the LORD of hosts.", "Is it time for you to dwell in your cieled houses?", "Ye have sown much, and bring in little.", "Thus saith the LORD of hosts; Consider your ways."]], [["దర్యావేషు రాజు రెండవ సంవత్సరమందు.", "సైన్యములకధిపతియగు యెహోవా ఈలాగు సెలవిచ్చుచున్నాడు.", "ఇది మీరు పైకప్పుగల ఇండ్లలో నివసించు కాలమా?", "మీరు విస్తారముగా విత్తితిరి గాని కొంచెముగా తెచ్చుకొంటిరి.", "సైన్యములకధిపతియగు యెహోవా మీ ప్రవర్తన విషయమై ఆలోచించుకొనుడని సెలవిచ్చుచున్నాడు."]]),
    (38, "Zechariah", "జెకర్యా", [["In the eighth month, in the second year of Darius.", "The LORD hath been sore displeased with your fathers.", "Therefore say thou unto them, Thus saith the LORD of hosts.", "Turn ye unto me, saith the LORD of hosts.", "Be ye not as your fathers."]], [["దర్యావేషు రెండవ సంవత్సరము ఎనిమిదవ నెలలో.", "యెహోవా మీ పితరులమీద బహుగా కోపగించెను.", "కాబట్టి సైన్యములకధిపతియగు యెహోవా ఈలాగు సెలవిచ్చుచున్నాడని వారితో చెప్పుము.", "నాయొద్దకు తిరుగుడి అని సైన్యములకధిపతియగు యెహోవా సెలవిచ్చుచున్నాడు.", "మీ పితరులవలె ఉండకుడి."]]),
    (39, "Malachi", "మలాకీ", [["The burden of the word of the LORD to Israel by Malachi.", "I have loved you, saith the LORD.", "Was not Esau Jacob's brother? saith the LORD.", "Yet I loved Jacob, and I hated Esau.", "And I laid his mountains and his heritage waste."]], [["మలాకీ ద్వారా ఇశ్రాయేలునకు ప్రత్యక్షమైన యెహోవా వాక్కు.", "నేను మిమ్మును ప్రేమించితినని యెహోవా సెలవిచ్చుచున్నాడు.", "ఏశావు యాకోబు సహోదరుడు గదా అని యెహోవా సెలవిచ్చుచున్నాడు.", "అయినను యాకోబును ప్రేమించితిని ఏశావును ద్వేషించితిని.", "అతని పర్వతములను పాడుచేసి అతని స్వాస్థ్యమును అరణ్యపు నక్కలకు అప్పగించితిని."]]),
    # NEW TESTAMENT - GOSPELS
    (40, "Matthew", "మత్తయి", [
        ["The book of the generation of Jesus Christ, the son of David, the son of Abraham.",
         "Abraham begat Isaac; and Isaac begat Jacob; and Jacob begat Judas and his brethren.",
         "And Judas begat Phares and Zara of Thamar.",
         "And Aram begat Aminadab; and Aminadab begat Naasson.",
         "And Salmon begat Booz of Rachab; and Booz begat Obed of Ruth."],
        ["Now when Jesus was born in Bethlehem of Judaea in the days of Herod the king.",
         "Where is he that is born King of the Jews?",
         "When Herod the king had heard these things, he was troubled.",
         "And when he had gathered all the chief priests and scribes of the people together.",
         "And thou Bethlehem, in the land of Juda, art not the least among the princes of Juda."],
    ], [
        ["అబ్రాహాము కుమారుడైన దావీదు కుమారుడగు యేసుక్రీస్తు వంశావళి.",
         "అబ్రాహాము ఇస్సాకును కనెను; ఇస్సాకు యాకోబును కనెను; యాకోబు యూదాను అతని సహోదరులను కనెను.",
         "యూదా తామారువలన పెరెసును జెరహును కనెను.",
         "అరాము అమ్మీనాదాబును కనెను; అమ్మీనాదాబు నయస్సోనును కనెను.",
         "సల్మోను రాహాబువలన బోయజును కనెను; బోయజు రూతువలన ఓబేదును కనెను."],
        ["హేరోదురాజు దినములలో యూదయ బేత్లెహేములో యేసు పుట్టిన తరువాత.",
         "యూదులకు రాజుగా పుట్టినవాడు ఎక్కడ ఉన్నాడు?",
         "హేరోదురాజు ఈ సంగతి విని కలవరపడెను.",
         "అతడు ప్రజలయొక్క ప్రధానయాజకులను శాస్త్రులను అందరిని సమకూర్చెను.",
         "యూదాదేశపు బేత్లెహేమా, యూదా ప్రధానులలో నీవు ఎంతమాత్రమును అల్పమైనది కావు."],
    ]),
    (41, "Mark", "మార్కు", [["The beginning of the gospel of Jesus Christ, the Son of God.", "As it is written in the prophets, Behold, I send my messenger before thy face.", "The voice of one crying in the wilderness, Prepare ye the way of the Lord.", "John did baptize in the wilderness, and preach the baptism of repentance.", "And there went out unto him all the land of Judaea."]], [["దేవుని కుమారుడైన యేసుక్రీస్తు సువార్త ప్రారంభము.", "ప్రవక్తల గ్రంథములలో వ్రాయబడినట్టు ఇదిగో నీకు ముందుగా నా దూతను పంపుచున్నాను.", "అరణ్యములో కేకవేయువాని స్వరము ప్రభువు మార్గమును సిద్ధపరచుడి.", "యోహాను అరణ్యములో బాప్తిస్మమిచ్చుచు మారుమనస్సు బాప్తిస్మమును ప్రకటించెను.", "యూదయ దేశస్థులందరును యెరూషలేము వారందరును అతని యొద్దకు వెళ్ళిరి."]]),
    (42, "Luke", "లూకా", [["Forasmuch as many have taken in hand to set forth in order a declaration.", "It seemed good to me also to write unto thee in order.", "There was in the days of Herod, the king of Judaea, a certain priest named Zacharias.", "And they were both righteous before God.", "And they had no child, because that Elisabeth was barren."]], [["మనలో నెరవేరిన సంగతులనుగూర్చి వివరణ వ్రాయుటకు అనేకులు ప్రయత్నించిరి.", "నేను కూడా మొదటినుండి అన్ని సంగతులను జాగ్రత్తగా పరిశీలించి.", "యూదయ రాజైన హేరోదు దినములలో జెకర్యా అను ఒక యాజకుడుండెను.", "వారిద్దరును దేవుని యెదుట నీతిమంతులై యుండిరి.", "ఎలీసబెతు గొడ్రాలగుటచేత వారికి సంతానము లేకుండెను."]]),
    (43, "John", "యోహాను", [
        ["In the beginning was the Word, and the Word was with God, and the Word was God.",
         "The same was in the beginning with God.",
         "All things were made by him; and without him was not any thing made that was made.",
         "In him was life; and the life was the light of men.",
         "And the light shineth in darkness; and the darkness comprehended it not.",
         "There was a man sent from God, whose name was John.",
         "The same came for a witness, to bear witness of the Light."],
    ], [
        ["ఆదియందు వాక్యముండెను, ఆ వాక్యము దేవుని యొద్ద ఉండెను, ఆ వాక్యము దేవుడై యుండెను.",
         "ఆయన ఆదియందు దేవునియొద్ద ఉండెను.",
         "సమస్తమును ఆయన మూలముగా కలిగెను; కలిగియున్నదేదియు ఆయన లేకుండ కలుగలేదు.",
         "ఆయనలో జీవముండెను; ఆ జీవము మనుష్యులకు వెలుగైయుండెను.",
         "ఆ వెలుగు చీకటిలో ప్రకాశించుచున్నది; చీకటి దాని గ్రహింపలేదు.",
         "దేవునియొద్దనుండి పంపబడిన యోహాను అను ఒక మనుష్యుడుండెను.",
         "అతడు ఆ వెలుగునుగూర్చి సాక్ష్యమిచ్చుటకు సాక్షిగా వచ్చెను."],
    ]),
    # HISTORY
    (44, "Acts", "అపొస్తలుల కార్యములు", [["The former treatise have I made, O Theophilus, of all that Jesus began both to do and teach.", "Until the day in which he was taken up.", "To whom also he shewed himself alive after his passion.", "Being assembled together with them, commanded them that they should not depart from Jerusalem.", "For John truly baptized with water; but ye shall be baptized with the Holy Ghost."]], [["థెయొఫిలా, యేసు చేయుటకును బోధించుటకును ఆరంభించిన సమస్త కార్యములనుగూర్చి.", "ఆయన పరమునకు చేర్చుకొనబడిన దినమువరకు.", "ఆయన తన శ్రమానుభవము తరువాత వారికి తన్ను తాను సజీవునిగా కనుపరచుకొనెను.", "వారితో కూడ ఉన్నప్పుడు యెరూషలేమును విడిచిపోక తండ్రి వాగ్దానము కొరకు కనిపెట్టుడని చెప్పెను.", "యోహాను నీళ్ళతో బాప్తిస్మమిచ్చెను గాని కొన్ని దినములైన తరువాత మీరు పరిశుద్ధాత్మలో బాప్తిస్మమును పొందెదరు."]]),
    # EPISTLES
    (45, "Romans", "రోమీయులకు", [["Paul, a servant of Jesus Christ, called to be an apostle.", "Which he had promised afore by his prophets in the holy scriptures.", "Concerning his Son Jesus Christ our Lord.", "By whom we have received grace and apostleship.", "Among whom are ye also the called of Jesus Christ."]], [["యేసుక్రీస్తు దాసుడును అపొస్తలుడుగా పిలువబడిన పౌలు.", "ఆయన తన ప్రవక్తలద్వారా పరిశుద్ధ లేఖనములలో ముందుగా వాగ్దానము చేసిన సువార్తనుగూర్చి.", "ఆయన కుమారుడైన మన ప్రభువగు యేసుక్రీస్తునుగూర్చి.", "ఆయన ద్వారా మేము కృపను అపొస్తలత్వమును పొందితిమి.", "వారిలో యేసుక్రీస్తు పిలువబడిన వారైన మీరును ఉన్నారు."]]),
    (46, "1 Corinthians", "1 కొరింథీయులకు", [["Paul, called to be an apostle of Jesus Christ through the will of God.", "Unto the church of God which is at Corinth.", "Grace be unto you, and peace, from God our Father.", "I thank my God always on your behalf.", "That in every thing ye are enriched by him."]], [["దేవుని చిత్తమువలన యేసుక్రీస్తు అపొస్తలుడుగా పిలువబడిన పౌలు.", "కొరింథులో ఉన్న దేవుని సంఘమునకు.", "మన తండ్రియైన దేవునినుండియు ప్రభువైన యేసుక్రీస్తునుండియు కృపయు సమాధానమును మీకు కలుగును గాక.", "క్రీస్తుయేసునందు మీకనుగ్రహింపబడిన దేవుని కృపనుబట్టి.", "మీరు ఆయనయందు ప్రతి విషయములోను ఐశ్వర్యవంతులై యున్నారు."]]),
    (47, "2 Corinthians", "2 కొరింథీయులకు", [["Paul, an apostle of Jesus Christ by the will of God.", "Grace be to you and peace from God our Father.", "Blessed be God, even the Father of our Lord Jesus Christ.", "Who comforteth us in all our tribulation.", "For as the sufferings of Christ abound in us."]], [["దేవుని చిత్తమువలన యేసుక్రీస్తు అపొస్తలుడైన పౌలు.", "మన తండ్రియైన దేవునినుండి కృపయు సమాధానమును మీకు కలుగును గాక.", "మన ప్రభువైన యేసుక్రీస్తు తండ్రియైన దేవుడు స్తుతింపబడును గాక.", "మా శ్రమలన్నిటిలో ఆయన మమ్మును ఆదరించుచున్నాడు.", "క్రీస్తు శ్రమలు మాయందు విస్తరించునట్లు."]]),
    (48, "Galatians", "గలతీయులకు", [["Paul, an apostle, not of men, neither by man, but by Jesus Christ.", "Grace be to you and peace from God the Father.", "I marvel that ye are so soon removed.", "But though we, or an angel from heaven, preach any other gospel.", "For do I now persuade men, or God?"]], [["మనుష్యులవలన గాక మనుష్యుని ద్వారా గాక యేసుక్రీస్తు ద్వారా అపొస్తలుడైన పౌలు.", "తండ్రియైన దేవునినుండి కృపయు సమాధానమును మీకు కలుగును గాక.", "మిమ్మును పిలిచిన వానిని మీరు ఇంత త్వరగా విడిచిపెట్టుట నాకు ఆశ్చర్యముగా ఉన్నది.", "మేమైనను పరలోకమునుండి ఒక దూతయైనను వేరొక సువార్తను ప్రకటించినయెడల.", "నేనిప్పుడు మనుష్యులను ఒప్పించుచున్నానా దేవుని ఒప్పించుచున్నానా?"]]),
    (49, "Ephesians", "ఎఫెసీయులకు", [["Paul, an apostle of Jesus Christ by the will of God.", "Grace be to you, and peace, from God our Father.", "Blessed be the God and Father of our Lord Jesus Christ.", "Who hath blessed us with all spiritual blessings in heavenly places.", "According as he hath chosen us in him before the foundation of the world."]], [["దేవుని చిత్తమువలన క్రీస్తుయేసు అపొస్తలుడైన పౌలు.", "మన తండ్రియైన దేవునినుండి కృపయు సమాధానమును మీకు కలుగును గాక.", "మన ప్రభువైన యేసుక్రీస్తు తండ్రియగు దేవుడు స్తుతింపబడును గాక.", "ఆయన క్రీస్తునందు పరలోక స్థలములలో ఆత్మసంబంధమైన ప్రతి ఆశీర్వాదమును మనకనుగ్రహించెను.", "జగత్తు పునాది వేయబడక మునుపే ఆయన మనలను క్రీస్తునందు ఏర్పరచుకొనెను."]]),
    (50, "Philippians", "ఫిలిప్పీయులకు", [["Paul and Timotheus, the servants of Jesus Christ.", "Grace be unto you, and peace, from God our Father.", "I thank my God upon every remembrance of you.", "Always in every prayer of mine for you all.", "For your fellowship in the gospel from the first day until now."]], [["యేసుక్రీస్తు దాసులైన పౌలును తిమోతియును.", "మన తండ్రియైన దేవునినుండి కృపయు సమాధానమును మీకు కలుగును గాక.", "మిమ్మును జ్ఞాపకము చేసికొనిన ప్రతిసారి నా దేవునికి కృతజ్ఞతాస్తుతులు చెల్లించుచున్నాను.", "మీ అందరికొరకు ప్రతి ప్రార్థనయందును సంతోషముతో విన్నపము చేయుచున్నాను.", "మొదటి దినమునుండి ఇప్పటివరకు సువార్తలో మీ పాలిభాగమునుబట్టి."]]),
    (51, "Colossians", "కొలొస్సయులకు", [["Paul, an apostle of Jesus Christ by the will of God.", "Grace be unto you, and peace.", "We give thanks to God and the Father of our Lord Jesus Christ.", "Since we heard of your faith in Christ Jesus.", "For the hope which is laid up for you in heaven."]], [["దేవుని చిత్తమువలన క్రీస్తుయేసు అపొస్తలుడైన పౌలు.", "కృపయు సమాధానమును మీకు కలుగును గాక.", "మన ప్రభువైన యేసుక్రీస్తు తండ్రియగు దేవునికి కృతజ్ఞతాస్తుతులు చెల్లించుచున్నాము.", "క్రీస్తుయేసునందు మీకున్న విశ్వాసమునుగూర్చి విని.", "పరలోకమందు మీకొరకు భద్రపరచబడిన నిరీక్షణనుబట్టి."]]),
    (52, "1 Thessalonians", "1 థెస్సలొనీకయులకు", [["Paul, and Silvanus, and Timotheus, unto the church of the Thessalonians.", "Grace be unto you, and peace.", "We give thanks to God always for you all.", "Remembering without ceasing your work of faith.", "For our gospel came not unto you in word only."]], [["థెస్సలొనీకయులలో ఉన్న సంఘమునకు పౌలును సిల్వానును తిమోతియును.", "కృపయు సమాధానమును మీకు కలుగును గాక.", "మీ అందరినిగూర్చి ఎల్లప్పుడును దేవునికి కృతజ్ఞతాస్తుతులు చెల్లించుచున్నాము.", "మీ విశ్వాసముయొక్క కార్యమును ఎడతెగక జ్ఞాపకము చేసికొనుచున్నాము.", "మా సువార్త మాటలోనే గాక శక్తిలోను పరిశుద్ధాత్మలోను మీయొద్దకు వచ్చెను."]]),
    (53, "2 Thessalonians", "2 థెస్సలొనీకయులకు", [["Paul, and Silvanus, and Timotheus, unto the church of the Thessalonians.", "Grace unto you, and peace.", "We are bound to thank God always for you.", "So that we ourselves glory in you in the churches of God.", "Which is a manifest token of the righteous judgment of God."]], [["థెస్సలొనీకయులలో ఉన్న సంఘమునకు పౌలును సిల్వానును తిమోతియును.", "కృపయు సమాధానమును మీకు కలుగును గాక.", "సహోదరులారా, మేము మీనిమిత్తము ఎల్లప్పుడును దేవునికి కృతజ్ఞతాస్తుతులు చెల్లించుటకు బద్ధులమై యున్నాము.", "కాగా మేమే దేవుని సంఘములలో మిమ్మునుగూర్చి అతిశయించుచున్నాము.", "ఇది దేవుని న్యాయమైన తీర్పునకు స్పష్టమైన సూచన."]]),
    (54, "1 Timothy", "1 తిమోతికి", [["Paul, an apostle of Jesus Christ by the commandment of God our Saviour.", "Unto Timothy, my own son in the faith.", "As I besought thee to abide still at Ephesus.", "Neither give heed to fables and endless genealogies.", "Now the end of the commandment is charity out of a pure heart."]], [["మన రక్షకుడైన దేవుని ఆజ్ఞప్రకారము యేసుక్రీస్తు అపొస్తలుడైన పౌలు.", "విశ్వాసమందు నా నిజమైన కుమారుడైన తిమోతికి.", "ఎఫెసులో ఉండుమని నేను నిన్ను బతిమాలుకొన్నట్టు.", "కల్పనకథలయందును అంతములేని వంశావళులయందును లక్ష్యము ఉంచకుమని.", "ఆజ్ఞయొక్క ఉద్దేశము శుద్ధహృదయమునుండి కలుగు ప్రేమయే."]]),
    (55, "2 Timothy", "2 తిమోతికి", [["Paul, an apostle of Jesus Christ by the will of God.", "To Timothy, my dearly beloved son.", "I thank God, whom I serve from my forefathers with pure conscience.", "Greatly desiring to see thee, being mindful of thy tears.", "When I call to remembrance the unfeigned faith that is in thee."]], [["దేవుని చిత్తమువలన క్రీస్తుయేసు అపొస్తలుడైన పౌలు.", "ప్రియమైన కుమారుడైన తిమోతికి.", "నా పూర్వికులవలె పవిత్రమైన మనస్సాక్షితో నేను సేవించు దేవునికి కృతజ్ఞతాస్తుతులు చెల్లించుచున్నాను.", "నీ కన్నీళ్లను జ్ఞాపకము చేసికొని నిన్ను చూడవలెనని మిక్కిలి ఆశపడుచున్నాను.", "నీయందున్న యథార్థమైన విశ్వాసమును జ్ఞాపకము చేసికొనుచున్నాను."]]),
    (56, "Titus", "తీతుకు", [["Paul, a servant of God, and an apostle of Jesus Christ.", "In hope of eternal life, which God promised before the world began.", "To Titus, mine own son after the common faith.", "For this cause left I thee in Crete.", "If any be blameless, the husband of one wife."]], [["దేవుని దాసుడును యేసుక్రీస్తు అపొస్తలుడునైన పౌలు.", "అబద్ధమాడని దేవుడు అనాదికాలమందు వాగ్దానము చేసిన నిత్యజీవమునుగూర్చిన నిరీక్షణనుబట్టి.", "సామాన్యమైన విశ్వాసమందు నా నిజమైన కుమారుడైన తీతుకు.", "ఈ హేతువుచేతను నేను నిన్ను క్రేతులో ఉంచితిని.", "నిర్దోషుడును ఏకపత్నీ భర్తయునై యుండవలెను."]]),
    (57, "Philemon", "ఫిలేమోనుకు", [["Paul, a prisoner of Jesus Christ, and Timothy our brother.", "Unto Philemon our dearly beloved, and fellowlabourer.", "Grace to you, and peace, from God our Father.", "I thank my God, making mention of thee always in my prayers.", "Hearing of thy love and faith."]], [["క్రీస్తుయేసు ఖైదీయైన పౌలును సహోదరుడైన తిమోతియును.", "మా ప్రియమిత్రుడును తోడి పనివాడునైన ఫిలేమోనునకు.", "మన తండ్రియైన దేవునినుండి కృపయు సమాధానమును మీకు కలుగును గాక.", "నా ప్రార్థనలలో నిన్ను జ్ఞాపకము చేసికొనుచు ఎల్లప్పుడును నా దేవునికి కృతజ్ఞతాస్తుతులు చెల్లించుచున్నాను.", "ప్రభువైన యేసునందును సమస్త పరిశుద్ధులయందును నీకున్న ప్రేమను విశ్వాసమును గూర్చి విని."]]),
    (58, "Hebrews", "హెబ్రీయులకు", [["God, who at sundry times and in divers manners spake in time past unto the fathers.", "Hath in these last days spoken unto us by his Son.", "Whom he hath appointed heir of all things.", "Who being the brightness of his glory, and the express image of his person.", "Being made so much better than the angels."]], [["పూర్వకాలమందు నానావిధములుగాను నానాప్రకారములుగాను ప్రవక్తలద్వారా పితరులతో మాటలాడిన దేవుడు.", "ఈ దినముల అంతమందు కుమారుని ద్వారా మనతో మాటలాడెను.", "ఆయనను సమస్తమునకు వారసునిగా నియమించెను.", "ఆయన దేవుని మహిమయొక్క తేజస్సును ఆయన తత్వముయొక్క ముద్రయునైయుండి.", "దేవదూతలకంటె ఎంతో శ్రేష్ఠుడాయెను."]]),
    (59, "James", "యాకోబు", [["James, a servant of God and of the Lord Jesus Christ.", "My brethren, count it all joy when ye fall into divers temptations.", "Knowing this, that the trying of your faith worketh patience.", "But let patience have her perfect work.", "If any of you lack wisdom, let him ask of God."]], [["దేవునికిని ప్రభువైన యేసుక్రీస్తునకును దాసుడైన యాకోబు.", "నా సహోదరులారా, మీరు నానావిధమైన శోధనలలో పడునప్పుడు అది మహానందమని ఎంచుకొనుడి.", "మీ విశ్వాసమునకు కలుగు పరీక్ష ఓర్పును పుట్టించునని ఎరిగి.", "ఓర్పు తన క్రియను సంపూర్ణముగా జరిగింపనియ్యుడి.", "మీలో ఎవనికైనను జ్ఞానము కొదువగా ఉండినయెడల అతడు దేవుని అడుగవలెను."]]),
    (60, "1 Peter", "1 పేతురు", [["Peter, an apostle of Jesus Christ.", "Elect according to the foreknowledge of God the Father.", "Grace unto you, and peace, be multiplied.", "Blessed be the God and Father of our Lord Jesus Christ.", "Which according to his abundant mercy hath begotten us again."]], [["యేసుక్రీస్తు అపొస్తలుడైన పేతురు.", "తండ్రియైన దేవుని భవిష్యద్ జ్ఞానమును అనుసరించి ఏర్పరచబడినవారికి.", "కృపయు సమాధానమును మీకు విస్తరించును గాక.", "మన ప్రభువైన యేసుక్రీస్తు తండ్రియైన దేవుడు స్తుతింపబడును గాక.", "ఆయన తన విస్తారమైన కనికరమునుచొప్పున మనలను తిరిగి జన్మింపజేసెను."]]),
    (61, "2 Peter", "2 పేతురు", [["Simon Peter, a servant and an apostle of Jesus Christ.", "Grace and peace be multiplied unto you.", "According as his divine power hath given unto us all things.", "Whereby are given unto us exceeding great and precious promises.", "And beside this, giving all diligence, add to your faith virtue."]], [["యేసుక్రీస్తు దాసుడును అపొస్తలుడునైన సీమోను పేతురు.", "కృపయు సమాధానమును మీకు విస్తరించును గాక.", "ఆయన దివ్యశక్తి జీవమునకును భక్తికిని కావలసినవన్నియు మనకు దయచేసెను.", "దీనివలన ఆయన మనకు అమూల్యమైనవియు అతి గొప్పవియునైన వాగ్దానములను అనుగ్రహించెను.", "ఈ హేతువునుబట్టి మీరు పూర్ణ జాగ్రత్తతో మీ విశ్వాసమునకు సద్గుణమును చేర్చుడి."]]),
    (62, "1 John", "1 యోహాను", [["That which was from the beginning, which we have heard.", "That which we have seen and heard declare we unto you.", "And these things write we unto you, that your joy may be full.", "This then is the message which we have heard of him.", "God is light, and in him is no darkness at all."]], [["ఆదినుండి ఉన్నదియు మేము విన్నదియు.", "మేము చూచినదానిని విన్నదానిని మీకు తెలియజేయుచున్నాము.", "మీ సంతోషము పరిపూర్ణమగునట్లు ఈ సంగతులను మీకు వ్రాయుచున్నాము.", "ఆయనయొద్దనుండి మేము విని మీకు ప్రకటించు వర్తమానమేమనగా.", "దేవుడు వెలుగు; ఆయనయందు చీకటి ఎంతమాత్రమును లేదు."]]),
    (63, "2 John", "2 యోహాను", [["The elder unto the elect lady and her children.", "For the truth's sake, which dwelleth in us.", "Grace be with you, mercy, and peace.", "I rejoiced greatly that I found of thy children walking in truth.", "And now I beseech thee, lady, not as though I wrote a new commandment."]], [["పెద్దయైన నేను ఏర్పరచబడిన అమ్మకును ఆమె పిల్లలకును.", "మనయందు నిలిచియుండి ఎల్లకాలము మనతో కూడ ఉండు సత్యమునుబట్టి.", "కృపయు కనికరమును సమాధానమును మీకు కలుగును గాక.", "నీ పిల్లలలో కొందరు సత్యమునందు నడుచుచుండుట చూచి నేను మిక్కిలి సంతోషించితిని.", "అమ్మా, క్రొత్త ఆజ్ఞవలె గాక ఆదినుండి మనకుండిన ఆజ్ఞను మీకు వ్రాయుచున్నాను."]]),
    (64, "3 John", "3 యోహాను", [["The elder unto the wellbeloved Gaius, whom I love in the truth.", "Beloved, I wish above all things that thou mayest prosper.", "For I rejoiced greatly, when the brethren came and testified of the truth.", "I have no greater joy than to hear that my children walk in truth.", "Beloved, thou doest faithfully whatsoever thou doest."]], [["పెద్దయైన నేను సత్యమందు ప్రేమించు ప్రియమైన గాయికి.", "ప్రియుడా, నీ ఆత్మ వర్ధిల్లుచున్నట్లే నీవు అన్ని విషయములలో వర్ధిల్లుచు సుఖముగా ఉండవలెనని ప్రార్థించుచున్నాను.", "సహోదరులు వచ్చి నీయొక్క సత్యమునుగూర్చి సాక్ష్యమిచ్చినప్పుడు నేను మిక్కిలి సంతోషించితిని.", "నా పిల్లలు సత్యమునందు నడుచుచున్నారని విన్నప్పుడు అంతకంటె ఎక్కువైన సంతోషము నాకు లేదు.", "ప్రియుడా, నీవు సహోదరులయందు చేయుచున్నది నమ్మకముగా చేయుచున్నావు."]]),
    (65, "Jude", "యూదా", [["Jude, the servant of Jesus Christ, and brother of James.", "Mercy unto you, and peace, and love, be multiplied.", "Beloved, when I gave all diligence to write unto you of the common salvation.", "For there are certain men crept in unawares.", "I will therefore put you in remembrance."]], [["యేసుక్రీస్తు దాసుడును యాకోబు సహోదరుడునైన యూదా.", "కనికరమును సమాధానమును ప్రేమయును మీకు విస్తరించును గాక.", "ప్రియులారా, మన అందరికిని కలిగిన రక్షణనుగూర్చి మీకు వ్రాయుటకు నేను పూర్ణ ప్రయత్నము చేయుచుండగా.", "కొందరు మనుష్యులు రహస్యముగా జొరబడియున్నారు.", "కాబట్టి మీకు ఒక సారి జ్ఞాపకము చేయగోరుచున్నాను."]]),
    # APOCALYPSE
    (66, "Revelation", "ప్రకటన గ్రంథము", [
        ["The Revelation of Jesus Christ, which God gave unto him.",
         "Blessed is he that readeth, and they that hear the words of this prophecy.",
         "John to the seven churches which are in Asia.",
         "Grace be unto you, and peace, from him which is, and which was, and which is to come.",
         "And from Jesus Christ, who is the faithful witness."],
        ["I was in the Spirit on the Lord's day, and heard behind me a great voice.",
         "Saying, I am Alpha and Omega, the first and the last.",
         "And I turned to see the voice that spake with me.",
         "And being turned, I saw seven golden candlesticks.",
         "And in the midst of the seven candlesticks one like unto the Son of man."],
    ], [
        ["దేవుడు యేసుక్రీస్తునకు అనుగ్రహించిన ప్రకటన.",
         "ఈ ప్రవచన వాక్యములు చదువువాడును వినువారును ధన్యులు.",
         "ఆసియలో ఉన్న ఏడు సంఘములకు యోహాను వ్రాయునది.",
         "ఉన్నవాడును ఉండినవాడును రాబోవువాడునైన వానినుండి కృపయు సమాధానమును మీకు కలుగును గాక.",
         "నమ్మకమైన సాక్షియు మృతులలో ఆదిసంభూతుడునైన యేసుక్రీస్తునుండి."],
        ["ప్రభువు దినమందు ఆత్మవశుడనై యుంటిని; నా వెనుక బూర ధ్వనివంటి గొప్ప స్వరము విని.",
         "నేను అల్ఫాయు ఓమేగయు మొదటివాడను కడపటివాడను.",
         "నాతో మాటలాడుచున్న ఆ స్వరమును చూడవలెనని తిరిగితిని.",
         "తిరిగి చూడగా ఏడు బంగారు దీపస్తంభములు కనబడెను.",
         "ఆ దీపస్తంభముల మధ్య మనుష్యకుమారుని పోలిన ఒకడు కనబడెను."],
    ]),
]

def build_json(books_data, lang_idx):
    """Build JSON in the required format. lang_idx: 3=eng, 4=tel"""
    all_books = []
    for book_tuple in books_data:
        book_id = book_tuple[0]
        chapters_data = book_tuple[lang_idx]
        book_chapters = []
        for ch_idx, verses in enumerate(chapters_data):
            book_verses = []
            for v_idx, text in enumerate(verses):
                verseid = f"{book_id:02d}{(ch_idx+1):03d}{(v_idx+1):03d}"
                book_verses.append({"Verseid": verseid, "Verse": text})
            book_chapters.append({"Verse": book_verses})
        all_books.append({"Chapter": book_chapters})
    return {"Book": all_books}

eng_json = build_json(BOOKS, 3)
tel_json = build_json(BOOKS, 4)

with open('/app/frontend/assets/data/sample_bible_eng.json', 'w', encoding='utf-8') as f:
    json.dump(eng_json, f, ensure_ascii=False, indent=2)

with open('/app/frontend/assets/data/sample_bible_tel.json', 'w', encoding='utf-8') as f:
    json.dump(tel_json, f, ensure_ascii=False, indent=2)

# Stats
total_verses = sum(sum(len(ch) for ch in b[3]) for b in BOOKS)
total_chapters = sum(len(b[3]) for b in BOOKS)
print(f"Generated: {len(BOOKS)} books, {total_chapters} chapters, {total_verses} verses")
