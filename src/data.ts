import { Doctor, Service, Review, HealthTip } from './types';

export const DOCTORS_DATA: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dkt. Faraji Mwangi',
    specialty: 'Bingwa wa Magonjwa ya Moyo (Cardiologist)',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    availability: ['Jumatatu', 'Jumatano', 'Ijumaa'],
    rating: 4.9,
    biography: 'Dkt. Faraji ana uzoefu wa miaka mingi katika kutibu magonjwa ya moyo na mishipa ya damu. Amepata mafunzo yake ya kibingwa katika vyuo vikuu vya kimataifa na amesaidia mamia ya wagonjwa kurejesha afya zao.',
    experience: 15,
    education: 'Shahada ya Uzamili katika Kadiolojia (Chuo Kikuu cha Muhimbili)'
  },
  {
    id: 'doc-2',
    name: 'Dkt. Neema Kinabo',
    specialty: 'Bingwa wa Uzazi na Magonjwa ya Akina Mama (Gynecologist/Obstetrician)',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    availability: ['Jumatatu', 'Alhamisi', 'Ijumaa'],
    rating: 4.8,
    biography: 'Dkt. Neema amejitolea maisha yake kuboresha afya ya akina mama na watoto wachanga. Ni mtaalamu wa mimba zenye hatari kubwa na upasuaji wa uzazi.',
    experience: 12,
    education: 'Shahada ya Kibingwa ya Uzazi na Ukina Mama (UDSM)'
  },
  {
    id: 'doc-3',
    name: 'Dkt. Amadi Mrema',
    specialty: 'Bingwa wa Afya ya Watoto (Pediatrician)',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    availability: ['Jumanne', 'Jumatano', 'Alhamisi'],
    rating: 4.7,
    biography: 'Dkt. Amadi ni kipenzi cha watoto. Anahakikisha watoto wanapata matibabu sahihi katika mazingira rafiki na yenye furaha ili kupunguza woga wa hospitali.',
    experience: 10,
    education: 'Shahada ya Uzamili ya Afya ya Mtoto (Chuo Kikuu cha Kampala)'
  },
  {
    id: 'doc-4',
    name: 'Dkt. Saida Yusuf',
    specialty: 'Bingwa wa Magonjwa ya Ndani na Sukari (Internal Medicine Specialist)',
    image: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=400',
    availability: ['Jumatatu', 'Jumanne', 'Ijumaa'],
    rating: 4.9,
    biography: 'Dkt. Saida anashughulika na utambuzi na matibabu ya magonjwa sugu kama vile Shinikizo la Juu la Damu, Kisukari, na magonjwa ya Figo.',
    experience: 8,
    education: 'Shahada ya Udaktari wa Ndani (Chuo Kikuu cha Nairobi)'
  },
  {
    id: 'doc-5',
    name: 'Dkt. Baraka Msangi',
    specialty: 'Bingwa wa Upasuaji wa Kisasa (General Surgeon)',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=400',
    availability: ['Jumanne', 'Alhamisi', 'Ijumaa'],
    rating: 4.6,
    biography: 'Dkt. Baraka ana ujuzi mkubwa katika upasuaji mdogo na mkubwa kwa kutumia teknolojia ya kisasa ya matundu (Laparoscopy).',
    experience: 14,
    education: 'Shahada ya Uzamili katika Upasuaji Mkuu (Chuo Kikuu cha Makerere)'
  },
  {
    id: 'doc-6',
    name: 'Dkt. Kelvin Lyimo',
    specialty: 'Bingwa wa Magonjwa ya Mifupa na Viungo (Orthopedic Surgeon)',
    image: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?auto=format&fit=crop&q=80&w=400',
    availability: ['Jumatatu', 'Jumatano', 'Alhamisi'],
    rating: 4.8,
    biography: 'Dkt. Kelvin ni mtaalamu wa matibabu ya majeraha ya michezo, kuvunjika kwa mifupa, na uingizaji wa viungo vya bandia.',
    experience: 11,
    education: 'M.Med in Orthopedic Surgery (Chuo Kikuu cha Muhimbili)'
  }
];

export const SERVICES_DATA: Service[] = [
  {
    id: 'srv-1',
    title: 'Ushauri wa Daktari & Uchunguzi',
    description: 'Tunatoa ushauri wa kitaalamu na uchunguzi wa kina wa afya yako kwa kutumia vifaa vya kisasa zaidi.',
    iconName: 'Stethoscope',
    department: 'Idara ya Wagonjwa wa Nje (OPD)'
  },
  {
    id: 'srv-2',
    title: 'Huduma ya Dharura 24/7',
    description: 'Idara yetu ya dharura ipo wazi muda wote ikiwa na madaktari na wauguzi walio tayari kuokoa maisha.',
    iconName: 'Activity',
    department: 'Idara ya Dharura'
  },
  {
    id: 'srv-3',
    title: 'Uzazi na Afya ya Akina Mama',
    description: 'Tunatoa huduma salama za kujifungua, kliniki za wajawazito, na matibabu ya matatizo yote ya mfumo wa uzazi.',
    iconName: 'HeartPulse',
    department: 'Idara ya Uzazi'
  },
  {
    id: 'srv-4',
    title: 'Afya na Kliniki ya Watoto',
    description: 'Matibabu maalum, chanjo, na ufuatiliaji wa ukuaji wa mtoto wako tangu kuzaliwa hadi umri wa ujana.',
    iconName: 'Baby',
    department: 'Kliniki ya Watoto'
  },
  {
    id: 'srv-5',
    title: 'Maabara ya Kisasa na Vipimo',
    description: 'Vipimo vya damu, mkojo, na uchunguzi mwingine wa kimaabara unaofanyika kwa uaminifu na haraka zaidi.',
    iconName: 'FlaskConical',
    department: 'Idara ya Maabara'
  },
  {
    id: 'srv-6',
    title: 'Upasuaji wa Jumla na Matundu',
    description: 'Tuna vyumba vya kisasa vya upasuaji ambapo tunafanya upasuaji wa usalama wa hali ya juu kwa teknolojia mpya.',
    iconName: 'Scissors',
    department: 'Idara ya Upasuaji'
  }
];

export const REVIEWS_DATA: Review[] = [
  {
    id: 'rev-1',
    patientName: 'Amani S. Kamau',
    rating: 5,
    comment: 'Huduma hapa ni ya kipekee mno! Nilimpeleka mtoto wangu kwa Dkt. Amadi, alikuwa mgonjwa sana lakini daktari alimtia moyo na kumpatia dawa nzuri. Siku hizi mtoto haogopi tena kwenda hospitali.',
    date: '2026-06-15',
    doctorSpecialty: 'Kliniki ya Watoto'
  },
  {
    id: 'rev-2',
    patientName: 'Mariam Juma',
    rating: 5,
    comment: 'Nilijifungua mtoto wangu wa kwanza hapa chini ya uangalizi wa Dkt. Neema. Wauguzi wa hapa wana upendo, huruma, na ukarimu mkubwa sana. Mungu awabariki!',
    date: '2026-06-28',
    doctorSpecialty: 'Idara ya Uzazi'
  },
  {
    id: 'rev-3',
    patientName: 'John L. Massawe',
    rating: 4,
    comment: 'Nimekuwa nikihudhuria kliniki ya kisukari na moyo hapa. Dkt. Faraji na Dkt. Saida wanajali sana. Mfumo wao wa miadi mtandaoni umerahisisha sana maisha yangu, sihitaji kusubiri muda mrefu kupata huduma.',
    date: '2026-07-02',
    doctorSpecialty: 'Magonjwa ya Moyo / Sukari'
  },
  {
    id: 'rev-4',
    patientName: 'Zuberi Omari',
    rating: 5,
    comment: 'Nilifanyiwa upasuaji mdogo wa hernia na Dkt. Baraka. Sikuamini jinsi nilivyopona haraka kwa sababu walitumia teknolojia ya matundu. Huduma za maabara pia ni za haraka sana.',
    date: '2026-07-05',
    doctorSpecialty: 'Upasuaji'
  }
];

export const HEALTH_TIPS_DATA: HealthTip[] = [
  {
    id: 'tip-1',
    title: 'Kunywa Maji ya Kutosha',
    description: 'Hakikisha unakunywa angalau glasi 8 (lita 2) za maji safi kila siku ili kusaidia figo kuchuja uchafu na kuupa mwili nguvu na unyevu sahihi.',
    category: 'Maji',
    iconName: 'Droplets'
  },
  {
    id: 'tip-2',
    title: 'Punguza Matumizi ya Chumvi',
    description: 'Chumvi nyingi kwenye chakula huongeza shinikizo la damu na mzigo kwenye moyo na mishipa. Tumia viungo vya asili kuongeza ladha mbadala ya chumvi.',
    category: 'Moyo',
    iconName: 'HeartPulse'
  },
  {
    id: 'tip-3',
    title: 'Dakika 30 za Mazoezi',
    description: 'Kutembea kwa haraka, kukimbia au kufanya mazoezi ya viungo kwa dakika 30 kila siku huimarisha mfumo wa kinga, afya ya moyo, na kuzuia msongo wa mawazo.',
    category: 'Mazoezi',
    iconName: 'Activity'
  },
  {
    id: 'tip-4',
    title: 'Pata Usingizi wa Kutosha',
    description: 'Kulala masaa 7 hadi 8 kila usiku husaidia seli za mwili kujikarabati, kuboresha kumbukumbu na kupunguza kwa kiasi kikubwa homoni za msongo (cortisol).',
    category: 'Pumzika',
    iconName: 'Moon'
  },
  {
    id: 'tip-5',
    title: 'Chagua Matunda na Mboga',
    description: 'Hakikisha mlo wako una rangi mbalimbali za mboga na matunda. Hizi huupatia mwili antioxidants na nyuzi (fiber) muhimu kwa mmeng\'enyo mzuri wa chakula.',
    category: 'Lishe',
    iconName: 'Salad'
  },
  {
    id: 'tip-6',
    title: 'Pima Afya Mara kwa Mara',
    description: 'Kupima afya yako mara kwa mara (angalau mara moja kwa mwaka) kunakuwezesha kugundua na kukabili changamoto za afya mapema kabla hazijaleta madhara.',
    category: 'Ulinzi',
    iconName: 'ShieldCheck'
  },
  {
    id: 'tip-7',
    title: 'Jali Afya ya Kinywa chako',
    description: 'Kupiga mswaki mara mbili kwa siku na kutumia uzi wa kusafisha meno (floss) husaidia kuzuia bakteria wa kinywa wasiingie kwenye mfumo wa damu na kuathiri moyo wako.',
    category: 'Ulinzi',
    iconName: 'Sparkles'
  },
  {
    id: 'tip-8',
    title: 'Kaa na Mkao Sahihi wa Mwili',
    description: 'Unapofanya kazi kwenye kompyuta, hakikisha mgongo wako upo wima na miguu inagusa sakafu ili kuzuia maumivu sugu ya shingo, mgongo, na viungo.',
    category: 'Mazoezi',
    iconName: 'Flame'
  }
];

