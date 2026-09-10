import type { Lang } from '@/lib/i18n';

/**
 * Every word the guest reads, in each language. The Georgian is the couple's
 * own wording; the English and Russian carry its warmth and jokes rather than
 * translating it literally, which would land flat.
 */
export type Dictionary = {
  dateLong: string;
  timeLabel: string;
  venueName: string;
  venueAddress: string;

  heroEyebrow: string;
  scrollDown: string;

  blessing: readonly string[];
  invitationLine: string;
  invitationBody: readonly string[];

  countdownTitle: string;
  countdownTitleToday: string;
  countdownUnits: { days: string; hours: string; minutes: string; seconds: string };

  scheduleTitle: string;
  /** One label per entry in `siteConfig.scheduleTimes`, in order. */
  schedule: readonly string[];

  locationTitle: string;
  openInMaps: string;

  dressCodeTitle: string;
  dressCode: string;
  giftTitle: string;
  giftPreference: string;

  rsvpTitle: string;
  rsvpIntro: string;
  rsvpOpen: string;
  rsvpDeadline: string;
  skipIntro: string;
  openInvitation: string;

  fieldName: string;
  fieldNamePlaceholder: string;
  fieldAttending: string;
  attendingYes: string;
  attendingNo: string;
  fieldGuests: string;
  fieldDietary: string;
  fieldDietaryPlaceholder: string;
  fieldOptional: string;
  submit: string;
  submitting: string;
  thankYou: string;

  closingLine: string;
  photoPlaceholder: string;
};

const ka: Dictionary = {
  dateLong: 'შაბათი, 24 ოქტომბერი, 2026',
  timeLabel: '15:00 — გვიან ღამემდე',
  venueName: 'შატო მეფის ქალაქი',
  venueAddress: 'დავით აღმაშენებლის ქ. 10, ზემო ჭოჭეთი, კასპი',

  heroEyebrow: 'ჩვენი ქორწილი',
  scrollDown: 'ჩამოსქროლეთ',

  // Non-breaking space before the dash so it never starts the second line.
  blessing: ['ორი გადელებული გული — ერთი ბედი!'],
  invitationLine: 'ჩვენო ჯიგარო ხალხო!',
  invitationBody: [
    'საქმე ისე წავიდა, რომ ვქორწინდებით! აბა, შინ ჯდომა და შორიდან ყურება არ იყოს!',
    'გელოდებით ყოველს, რომ გუცაევის გოლივით იზეიმოს მთელმა დუნიამ! ერთად დავცხოთ, ვიცინოთ, ფეხების დაწყვეტამდე ვიცეკვოთ დევიღლიტოთ ქუსლები!',
  ],

  countdownTitle: 'ზეიმამდე დარჩა',
  countdownTitleToday: 'დღეს არის ის დღე',
  countdownUnits: { days: 'დღე', hours: 'საათი', minutes: 'წუთი', seconds: 'წამი' },

  scheduleTitle: 'დღის განრიგი',
  schedule: [
    'მეფის ქალაქში შეკრება, ფურშეტი ეზოში',
    'ხელის მოწერის ცერემონიალი',
    'რესტორანი',
  ],

  locationTitle: 'ლოკაცია',
  openInMaps: 'რუკაზე ნახვა',

  dressCodeTitle: 'დრეს-კოდი',
  dressCode:
    'გთხოვთ, აირჩიოთ რბილი, მიწისფერი ან ღვინისფერი ტონები — სპილოსძვლისფერი, ზეთისხილისფერი, ღრმა მწვანე ან ქლიავისფერი.',
  giftTitle: 'საჩუქრის შესახებ',
  giftPreference: 'თქვენი დასწრება ჩვენთვის საუკეთესო საჩუქარია.',

  rsvpTitle: 'დაადასტურეთ დასწრება',
  rsvpIntro:
    'არავინ არ გედირიოს და არ გედიფიქროს, თვარა წყენა იქნება და მერე თქვით „არ გავუფრთხილებივართო“!',
  rsvpOpen: 'დააჭირეთ',
  rsvpDeadline: 'გთხოვთ, გვაცნობოთ 1 ოქტომბრამდე',
  skipIntro: 'გამოტოვება',
  openInvitation: 'მოწვევის გახსნა',

  fieldName: 'სახელი და გვარი',
  fieldNamePlaceholder: 'თქვენი სახელი და გვარი',
  fieldAttending: 'დაესწრებით?',
  attendingYes: 'სიამოვნებით დავესწრები',
  attendingNo: 'სამწუხაროდ, ვერ დავესწრები',
  fieldGuests: 'სტუმრების რაოდენობა (თქვენთან ერთად)',
  fieldDietary: 'კვების შეზღუდვები',
  fieldDietaryPlaceholder: 'ვეგეტარიანული, ალერგია, სხვა…',
  fieldOptional: '(სურვილისამებრ)',
  submit: 'გაგზავნა',
  submitting: 'იგზავნება…',
  thankYou: 'გმადლობთ',

  closingLine: 'გელოდებით!',
  photoPlaceholder: 'აქ თქვენი ფოტო იქნება',
};

const en: Dictionary = {
  dateLong: 'Saturday, 24 October 2026',
  timeLabel: '15:00 — until late',
  venueName: 'Chateau Mephis Kalaki',
  venueAddress: '10 David Aghmashenebeli St, Upper Chocheti, Kaspi',

  heroEyebrow: 'Our wedding',
  scrollDown: 'Scroll down',

  blessing: ['Two hearts head over heels — one destiny!'],
  invitationLine: 'Our dear, wonderful people!',
  invitationBody: [
    'Well, things went the way they went — we are getting married! So no sitting at home and watching from a distance!',
    'We are expecting every single one of you, so the whole world can celebrate like a last-minute winner! Let us feast together, laugh, and dance until our heels give out!',
  ],

  countdownTitle: 'The celebration begins in',
  countdownTitleToday: 'Today is the day',
  countdownUnits: { days: 'Days', hours: 'Hours', minutes: 'Minutes', seconds: 'Seconds' },

  scheduleTitle: 'Order of the day',
  schedule: [
    'Gathering at Mephis Kalaki, reception in the courtyard',
    'Signing ceremony',
    'Dinner at the restaurant',
  ],

  locationTitle: 'Location',
  openInMaps: 'Open in Maps',

  dressCodeTitle: 'Dress code',
  dressCode:
    'We kindly ask for soft, earthy or wine tones — ivory, olive, deep green or plum.',
  giftTitle: 'About gifts',
  giftPreference: 'Your presence is the best gift we could ask for.',

  rsvpTitle: 'Confirm your attendance',
  rsvpIntro:
    'Nobody dare stay away, and do not even think about it — we will be hurt, and then do not say you were not warned!',
  rsvpOpen: 'Tap here',
  rsvpDeadline: 'Kindly let us know by 1 October',
  skipIntro: 'Skip',
  openInvitation: 'Open the invitation',

  fieldName: 'Full name',
  fieldNamePlaceholder: 'Your full name',
  fieldAttending: 'Will you be there?',
  attendingYes: 'Joyfully accepts',
  attendingNo: 'Regretfully declines',
  fieldGuests: 'Number of guests (including you)',
  fieldDietary: 'Dietary restrictions',
  fieldDietaryPlaceholder: 'Vegetarian, allergies, anything else…',
  fieldOptional: '(optional)',
  submit: 'Send',
  submitting: 'Sending…',
  thankYou: 'Thank you',

  closingLine: 'See you there!',
  photoPlaceholder: 'Your photo goes here',
};

const ru: Dictionary = {
  dateLong: 'Суббота, 24 октября 2026',
  timeLabel: '15:00 — до поздней ночи',
  venueName: 'Шато Мепис Калаки',
  venueAddress: 'ул. Давида Агмашенебели 10, Земо Чочети, Каспи',

  heroEyebrow: 'Наша свадьба',
  scrollDown: 'Листайте вниз',

  blessing: ['Два влюблённых сердца — одна судьба!'],
  invitationLine: 'Дорогие наши, золотые!',
  invitationBody: [
    'Дело приняло такой оборот — мы женимся! Так что дома сидеть и смотреть со стороны не годится!',
    'Ждём каждого, чтобы весь мир праздновал, как гол Гуцаева! Погуляем вместе, посмеёмся и станцуем до стёртых каблуков!',
  ],

  countdownTitle: 'До праздника осталось',
  countdownTitleToday: 'Сегодня тот самый день',
  countdownUnits: { days: 'дней', hours: 'часов', minutes: 'минут', seconds: 'секунд' },

  scheduleTitle: 'Программа дня',
  schedule: [
    'Сбор в Мепис Калаки, фуршет во дворе',
    'Церемония бракосочетания',
    'Ресторан',
  ],

  locationTitle: 'Локация',
  openInMaps: 'Открыть на карте',

  dressCodeTitle: 'Дресс-код',
  dressCode:
    'Просим выбрать мягкие, земляные или винные тона — слоновая кость, оливковый, глубокий зелёный или сливовый.',
  giftTitle: 'О подарках',
  giftPreference: 'Ваше присутствие — лучший для нас подарок.',

  rsvpTitle: 'Подтвердите присутствие',
  rsvpIntro:
    'Никто не смей отказаться и даже не думай — иначе обидимся, а потом не говорите, что вас не предупреждали!',
  rsvpOpen: 'Нажмите',
  rsvpDeadline: 'Просим сообщить до 1 октября',
  skipIntro: 'Пропустить',
  openInvitation: 'Открыть приглашение',

  fieldName: 'Имя и фамилия',
  fieldNamePlaceholder: 'Ваше имя и фамилия',
  fieldAttending: 'Придёте?',
  attendingYes: 'С радостью буду',
  attendingNo: 'К сожалению, не смогу',
  fieldGuests: 'Количество гостей (включая вас)',
  fieldDietary: 'Ограничения в еде',
  fieldDietaryPlaceholder: 'Вегетарианское, аллергия, другое…',
  fieldOptional: '(по желанию)',
  submit: 'Отправить',
  submitting: 'Отправляем…',
  thankYou: 'Спасибо',

  closingLine: 'Ждём вас!',
  photoPlaceholder: 'Здесь будет ваше фото',
};

export const translations: Record<Lang, Dictionary> = { ka, en, ru };
