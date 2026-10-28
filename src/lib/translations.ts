import type { Lang } from '@/lib/i18n';
import type { TemplateId } from '@/templates/types';

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
  /** Replaces the clock once the day has passed. */
  countdownTitlePast: string;
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
  /** Replies to a submitted RSVP. The server action only names one; the page words it. */
  rsvpMessages: Record<RsvpMessage, string>;

  closingLine: string;
  photoPlaceholder: string;

  playMusic: string;
  pauseMusic: string;

  /** The design gallery at /templates, and the bar shown while previewing one. */
  galleryTitle: string;
  galleryIntro: string;
  galleryOpen: string;
  galleryBack: string;
  galleryCurrent: string;
  galleryPrev: string;
  galleryNext: string;
  templates: Record<TemplateId, { name: string; mood: string }>;
};

export type RsvpMessage =
  | 'nameRequired'
  | 'nameTooLong'
  | 'attendingRequired'
  | 'guestCountRange'
  | 'checkFields'
  | 'notConnected'
  | 'saveFailed'
  | 'thanksAttending'
  | 'thanksDeclining';

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
  countdownTitlePast: 'ჩვენ დავქორწინდით!',
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
  rsvpMessages: {
    nameRequired: 'გთხოვთ, მიუთითოთ სახელი.',
    nameTooLong: 'სახელი ძალიან გრძელია.',
    attendingRequired: 'გთხოვთ, აღნიშნოთ დაესწრებით თუ არა.',
    guestCountRange: 'მიუთითეთ რიცხვი 1-დან 10-მდე.',
    checkFields: 'გთხოვთ, შეამოწმოთ მონიშნული ველები.',
    notConnected: 'მოწვევა ჯერ ბაზასთან არაა დაკავშირებული, პასუხი ვერ შეინახა.',
    saveFailed: 'პასუხის შენახვისას შეცდომა მოხდა. გთხოვთ, სცადოთ ხელახლა.',
    thanksAttending: 'გმადლობთ — მოუთმენლად ველოდებით თქვენთან ერთად აღნიშვნას.',
    thanksDeclining: 'გმადლობთ, რომ გვაცნობეთ. მოგვენატრებით.',
  },

  closingLine: 'გელოდებით!',
  photoPlaceholder: 'აქ თქვენი ფოტო იქნება',

  playMusic: 'მუსიკის ჩართვა',
  pauseMusic: 'მუსიკის გაჩერება',

  galleryTitle: 'მოსაწვევის დიზაინები',
  galleryIntro: 'ათი დიზაინი, ერთი შინაარსი. გახსენით რომელიმე, რომ ნახოთ მისი გახსნა და ყველა სექცია.',
  galleryOpen: 'ნახვა',
  galleryBack: 'ყველა დიზაინი',
  galleryCurrent: 'მიმდინარე',
  galleryPrev: 'წინა დიზაინი',
  galleryNext: 'შემდეგი დიზაინი',
  templates: {
    vineyard: { name: 'ვენახი', mood: 'აკვარელის ვენახი, ოქრო და ღვინისფერი, გახსნის ფილმი' },
    riviera: { name: 'რივიერა', mood: 'ლურჯი მაიოლიკა და ლიმონები — ბარათი კონვერტიდან ამოდის' },
    tbilisi: { name: 'ძველი თბილისი', mood: 'ჩუქურთმიანი აივნები, ტერაკოტა და ფირუზი — იღება ხის კარი' },
    midnight: { name: 'შუაღამის ბაღი', mood: 'მუქი მწვანე და ოქროს წვრილი ჩარჩოები — დალუქული ბარათი ორად იხსნება' },
    botanical: { name: 'ბოტანიკა', mood: 'სალბისფერი და ფერმკრთალი ვარდისფერი — კალკის ფურცელი იწევა' },
    deco: { name: 'არ-დეკო', mood: 'შავი და ოქრო, გეომეტრია — მზის სხივების კარიბჭე იშლება' },
    editorial: { name: 'ედიტორიალი', mood: 'ჟურნალის ტიპოგრაფია, შავ-თეთრი — ფარდა ზევით მიიწევს' },
    celestial: { name: 'ვარსკვლავები', mood: 'ღამის ცა, მთვარე და თანავარსკვლავედები — გვერდი მთვარიდან იშლება' },
    ribbon: { name: 'ლენტი', mood: 'ფერმკრთალი ვარდისფერი და ატლასი — ლენტი იხსნება, სახურავი იწევა' },
    kraft: { name: 'კრაფტი', mood: 'კრაფტის ქაღალდი, თოკი და პოლაროიდი — თოკი სრიალით ეხსნება' },
  },
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
  countdownTitlePast: 'We are married!',
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
  rsvpMessages: {
    nameRequired: 'Please enter your name.',
    nameTooLong: 'That name is too long.',
    attendingRequired: 'Please let us know whether you can come.',
    guestCountRange: 'Enter a number from 1 to 10.',
    checkFields: 'Please check the highlighted fields.',
    notConnected: 'The invitation is not connected to its guest list yet, so your reply was not saved.',
    saveFailed: 'Something went wrong saving your reply. Please try again.',
    thanksAttending: 'Thank you — we cannot wait to celebrate with you.',
    thanksDeclining: 'Thank you for letting us know. We will miss you.',
  },

  closingLine: 'See you there!',
  photoPlaceholder: 'Your photo goes here',

  playMusic: 'Play music',
  pauseMusic: 'Pause music',

  galleryTitle: 'Invitation designs',
  galleryIntro: 'Ten designs, one set of details. Open any of them to see its opening and every section.',
  galleryOpen: 'Preview',
  galleryBack: 'All designs',
  galleryCurrent: 'Current',
  galleryPrev: 'Previous design',
  galleryNext: 'Next design',
  templates: {
    vineyard: { name: 'Vineyard', mood: 'Watercolour vineyard, gold and wine, an opening film' },
    riviera: { name: 'Riviera', mood: 'Blue majolica and lemons — the card slides out of its envelope' },
    tbilisi: { name: 'Old Tbilisi', mood: 'Carved balconies, terracotta and teal — the wooden doors swing open' },
    midnight: { name: 'Midnight Garden', mood: 'Deep green with fine gold frames — the sealed card parts in two' },
    botanical: { name: 'Botanical', mood: 'Sage and blush watercolour — a vellum sheet lifts away' },
    deco: { name: 'Art Deco', mood: 'Black and gold geometry — the sunburst gates fold open' },
    editorial: { name: 'Editorial', mood: 'Magazine type in black and white — a curtain wipes up' },
    celestial: { name: 'Celestial', mood: 'Night sky, moon and constellations — the page opens out of the moon' },
    ribbon: { name: 'Ribbon', mood: 'Blush and satin — the ribbon unties and the lid lifts' },
    kraft: { name: 'Kraft & Twine', mood: 'Kraft paper, twine and a polaroid — the twine slips off' },
  },
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
  countdownTitlePast: 'Мы поженились!',
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
  rsvpMessages: {
    nameRequired: 'Пожалуйста, укажите имя.',
    nameTooLong: 'Имя слишком длинное.',
    attendingRequired: 'Пожалуйста, отметьте, придёте ли вы.',
    guestCountRange: 'Укажите число от 1 до 10.',
    checkFields: 'Пожалуйста, проверьте отмеченные поля.',
    notConnected: 'Приглашение ещё не подключено к списку гостей, поэтому ответ не сохранился.',
    saveFailed: 'Не удалось сохранить ответ. Пожалуйста, попробуйте ещё раз.',
    thanksAttending: 'Спасибо — с нетерпением ждём праздника вместе с вами.',
    thanksDeclining: 'Спасибо, что сообщили. Будем скучать.',
  },

  closingLine: 'Ждём вас!',
  photoPlaceholder: 'Здесь будет ваше фото',

  playMusic: 'Включить музыку',
  pauseMusic: 'Выключить музыку',

  galleryTitle: 'Дизайны приглашений',
  galleryIntro: 'Десять дизайнов, одно содержание. Откройте любой, чтобы увидеть его открытие и все разделы.',
  galleryOpen: 'Смотреть',
  galleryBack: 'Все дизайны',
  galleryCurrent: 'Текущий',
  galleryPrev: 'Предыдущий дизайн',
  galleryNext: 'Следующий дизайн',
  templates: {
    vineyard: { name: 'Виноградник', mood: 'Акварельный виноградник, золото и вино, вступительный фильм' },
    riviera: { name: 'Ривьера', mood: 'Синяя майолика и лимоны — открытка выезжает из конверта' },
    tbilisi: { name: 'Старый Тбилиси', mood: 'Резные балконы, терракота и бирюза — распахиваются деревянные двери' },
    midnight: { name: 'Полночный сад', mood: 'Глубокий зелёный и тонкое золото — запечатанная открытка раскрывается' },
    botanical: { name: 'Ботаника', mood: 'Шалфей и пудра — лист кальки приподнимается и уходит' },
    deco: { name: 'Ар-деко', mood: 'Чёрное с золотом — веерные врата раскрываются' },
    editorial: { name: 'Эдиториал', mood: 'Журнальная типографика, чёрно-белое — шторка уходит вверх' },
    celestial: { name: 'Звёздное небо', mood: 'Ночное небо, луна и созвездия — страница раскрывается из луны' },
    ribbon: { name: 'Лента', mood: 'Пудра и атлас — лента развязывается, крышка поднимается' },
    kraft: { name: 'Крафт', mood: 'Крафт, бечёвка и полароид — бечёвка соскальзывает' },
  },
};

export const translations: Record<Lang, Dictionary> = { ka, en, ru };
