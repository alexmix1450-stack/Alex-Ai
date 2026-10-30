function localAnswer(s) {
  s = s.toLowerCase().trim();

  if (/^(hi|hello|hey|namaste|namaskar|नमस्ते|हेलो|हाय)/.test(s))
    return 'नमस्ते! 😊 मैं Alex AI हूँ। बताइए, क्या मदद करूँ?';

  if (s.includes('तुम्हारा नाम') || s.includes('your name') || s.includes('naam kya') || s.includes('नाम क्या'))
    return 'मेरा नाम Alex AI है! 🤖';

  if (s.includes('कौन हो') || s.includes('who are you'))
    return 'मैं Alex AI हूँ, आपका Offline Assistant! 🤖';

  if (s.includes('मजाक') || s.includes('joke') || s.includes('majak'))
    return '😄 टीचर: बिजली कहाँ से आती है? बच्चा: मामा के घर से!';

  if (s.includes('offline') || s.includes('क्या कर सकते') || s.includes('ky kar') || s.includes('features') || s.includes('मदद') || s.includes('help'))
    return 'मैं Offline में ये काम कर सकती हूँ: 😊\n1. सामान्य बातचीत\n2. मजाक सुनाना\n3. अपना परिचय देना\n4. कुछ सामान्य सवालों के जवाब\n5. धन्यवाद और अभिवादन का जवाब';

  if (s.includes('धन्यवाद') || s.includes('thank'))
    return 'आपका स्वागत है! 😊';

  if (s.includes('कैसे हो') || s.includes('how are you'))
    return 'मैं बढ़िया हूँ! 😊';

  if (s.includes('भारत') || s.includes('india'))
    return 'भारत की राजधानी नई दिल्ली है। 🇮🇳';

  if (s.includes('bye') || s.includes('अलविदा'))
    return 'फिर मिलेंगे! 😊';

  return 'अच्छा सवाल है! 😊 अभी मेरे Offline ज्ञान में इसका जवाब उपलब्ध नहीं है।';
}
