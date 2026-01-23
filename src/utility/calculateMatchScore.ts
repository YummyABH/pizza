function calculateMatchScore(search, target) {
  const searchLower = search.toLowerCase();
  const targetLower = target.toLowerCase();
  let score = 0;
  
  // Разбиваем поисковый запрос на части
  const searchParts = searchLower.split(/\s+/);
  const targetParts = targetLower.split(/[ ,]+/);
  
  // 1. Проверка точного совпадения номеров
  const searchNumber = searchLower.match(/\d+/)?.[0];
  const targetNumber = targetLower.match(/\d+/)?.[0];
  
  if (searchNumber && targetNumber) {
    if (targetNumber === searchNumber) {
      score += 30; // Высокий балл за точное совпадение номера
    } else if (targetNumber.startsWith(searchNumber)) {
      score += 20; // Частичное совпадение номера
    }
  }
  
  // 2. Проверка совпадения ключевых слов
  searchParts.forEach(part => {
    if (part.length < 2) return;
    
    targetParts.forEach(targetPart => {
      if (targetPart === part) {
        score += 15; // Полное совпадение слова
      } else if (targetPart.includes(part)) {
        score += 10; // Частичное совпадение
      }
    });
  });
  
  // 3. Дополнительные бонусы
  // Бонус за более короткие адреса (более релевантные)
  if (targetParts.length < 5) {
    score += 5;
  }
  
  // Бонус за совпадение в начале строки
  if (targetLower.startsWith(searchParts[0])) {
    score += 10;
  }
  
  return score;
}

export function sortAddresses(searchString, addresses) {
  // Создаем массив объектов с адресом и его оценкой
  const scoredAddresses = addresses.map(address => ({
    address,
    score: calculateMatchScore(searchString, address)
  }));
  
  // Сортируем по убыванию оценки
  scoredAddresses.sort((a, b) => b.score - a.score);
  
  // Возвращаем только адреса
  return scoredAddresses.map(item => item.address);
}