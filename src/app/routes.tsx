import {
  createContext,
  FormEvent,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { createPortal } from "react-dom"
import {
  createBrowserRouter,
  Link,
  NavLink,
  Outlet,
  useLocation,
  useSearchParams,
} from "react-router"

const INSTAGRAM_URL = "https://www.instagram.com/zelisse.jewelry/"
const formatPrice = (price: number) =>
  new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(price)

type Language = "es" | "ca" | "en"

const languageNames: Record<Language, string> = {
  es: "Español",
  ca: "Català",
  en: "English",
}

const translations: Record<Exclude<Language, "es">, Record<string, string>> = {
  ca: {
    Nosotras: "Nosaltres",
    Servicios: "Serveis",
    Pedidos: "Comandes",
    Contacto: "Contacte",
    "Pedir cita": "Demanar cita",
    "Centro de estética · Sabadell": "Centre d'estètica · Sabadell",
    "Cuidado real · Resultados visibles": "Cura real · Resultats visibles",
    "Tu momento empieza aquí": "El teu moment comença aquí",
    "Tu piel,": "La teva pell,",
    "en buenas manos.": "en bones mans.",
    "Estética avanzada": "Estètica avançada",
    "Tecnología y cuidado personalizado": "Tecnologia i cura personalitzada",
    "Descubrir tratamientos": "Descobrir tractaments",
    "Resultados que se sienten. Rituales que se disfrutan. Un espacio pensado para ti.":
      "Resultats que es senten. Rituals que es gaudeixen. Un espai pensat per a tu.",
    "Reserva tu cita": "Reserva la teva cita",
    "Nuestra esencia": "La nostra essència",
    "Belleza consciente": "Bellesa conscient",
    "Cuidarte no es un lujo.": "Cuidar-te no és un luxe.",
    "Es volver a": "És tornar a",
    ti: "tu",
    "En Nou Sol entendemos la estética como un cuidado que empieza escuchándote. Cada piel, cada cuerpo y cada momento necesitan una atención diferente.":
      "A Nou Sol entenem l'estètica com una cura que comença escoltant-te. Cada pell, cada cos i cada moment necessiten una atenció diferent.",
    "Combinamos experiencia, diagnóstico y productos seleccionados para crear rituales sencillos, efectivos y sin prisas, en Sabadell.":
      "Combinem experiència, diagnòstic i productes seleccionats per crear rituals senzills, efectius i sense presses, a Sabadell.",
    "Conoce Nou Sol": "Coneix Nou Sol",
    "Qué hacemos": "Què fem",
    "Tu piel habla.": "La teva pell parla.",
    escuchamos: "escoltem",
    "Ver todos los servicios": "Veure tots els serveis",
    "Estética facial": "Estètica facial",
    "Cuidado corporal": "Cura corporal",
    "Mirada y belleza": "Mirada i bellesa",
    "Diagnóstico y tratamientos personalizados para devolver equilibrio, luz y confort a tu piel.":
      "Diagnòstic i tractaments personalitzats per retornar equilibri, llum i confort a la teva pell.",
    "Protocolos manuales y momentos de bienestar adaptados a lo que tu cuerpo necesita.":
      "Protocols manuals i moments de benestar adaptats al que el teu cos necessita.",
    "Gestos precisos para realzar tu expresión con un resultado natural y cuidado.":
      "Gestos precisos per realçar la teva expressió amb un resultat natural i cuidat.",
    "Sesiones de bronceado en cabina con tecnología ISOItalia® y atención personalizada.":
      "Sessions de bronzejat en cabina amb tecnologia ISOItalia® i atenció personalitzada.",
    "Tecnología aplicada a protocolos faciales y corporales adaptados a tus objetivos.":
      "Tecnologia aplicada a protocols facials i corporals adaptats als teus objectius.",
    "Depilación láser con valoración previa y un protocolo ajustado a cada persona.":
      "Depilació làser amb valoració prèvia i un protocol ajustat a cada persona.",
    "Tecnología estética corporal integrada en planes personalizados y con seguimiento.":
      "Tecnologia estètica corporal integrada en plans personalitzats i amb seguiment.",
    "Protocolo de estética avanzada definido según tus necesidades y objetivos.":
      "Protocol d'estètica avançada definit segons les teves necessitats i objectius.",
    "Belleza con criterio": "Bellesa amb criteri",
    "No buscamos cambiarte.": "No busquem canviar-te.",
    "Queremos que te veas": "Volem que et vegis",
    "más tú.": "més tu.",
    "Diagnóstico, manos expertas y una selección honesta de tratamientos. Sin excesos, sin prisas y con toda la atención puesta en ti.":
      "Diagnòstic, mans expertes i una selecció honesta de tractaments. Sense excessos, sense presses i amb tota l'atenció posada en tu.",
    "Nuestra filosofía": "La nostra filosofia",
    "Nuestra forma de hacer": "La nostra manera de fer",
    "Menos promesas.": "Menys promeses.",
    "Más escucha, más criterio": "Més escolta, més criteri",
    "y más": "i més",
    cuidado: "cura",
    "Conócenos en Instagram": "Coneix-nos a Instagram",
    "¿Empezamos?": "Comencem?",
    "Reserva tu momento": "Reserva el teu moment",
    "Quiénes somos": "Qui som",
    "Cuidado que": "Cura que",
    "se nota.": "es nota.",
    "Nuestros valores": "Els nostres valors",
    Escucha: "Escolta",
    Criterio: "Criteri",
    Cercanía: "Proximitat",
    Constancia: "Constància",
    "Antes de recomendar, preguntamos. Antes de tratar, entendemos.":
      "Abans de recomanar, preguntem. Abans de tractar, entenem.",
    "Elegimos lo que tu piel necesita, no lo que está de moda.":
      "Triem el que la teva pell necessita, no el que està de moda.",
    "Un trato humano, claro y sin prisas en cada visita.":
      "Un tracte humà, clar i sense presses a cada visita.",
    "Los mejores resultados nacen de cuidar bien, cada día.":
      "Els millors resultats neixen de cuidar bé, cada dia.",
    Tratamientos: "Tractaments",
    "Elige cómo quieres": "Tria com et vols",
    "cuidarte hoy.": "cuidar avui.",
    "Reservar este servicio": "Reservar aquest servei",
    "Tratamientos con": "Tractaments amb",
    "propósito.": "propòsit.",
    "¿No sabes qué elegir?": "No saps què triar?",
    "Te ayudamos a encontrar el cuidado que mejor encaja contigo.":
      "T'ajudem a trobar la cura que encaixa millor amb tu.",
    Selección: "Selecció",
    "El cuidado continúa": "La cura continua",
    "en casa.": "a casa.",
    "Encarga tus productos habituales, pide una recomendación o prepara un regalo especial. Confirmaremos disponibilidad y recogida.":
      "Encarrega els teus productes habituals, demana una recomanació o prepara un regal especial. Confirmarem disponibilitat i recollida.",
    Solicitar: "Sol·licitar",
    Ritual: "Ritual",
    Regalo: "Regal",
    "Rutina facial personalizada": "Rutina facial personalitzada",
    "Tarjeta regalo Nou Sol": "Targeta regal Nou Sol",
    "Producto recomendado": "Producte recomanat",
    "Una selección pensada según tu tipo de piel y tus objetivos.":
      "Una selecció pensada segons el teu tipus de pell i els teus objectius.",
    "Regala tiempo, cuidado y una experiencia elegida a medida.":
      "Regala temps, cura i una experiència triada a mida.",
    "Cuéntanos qué necesita tu piel y te ayudamos a elegir.":
      "Explica'ns què necessita la teva pell i t'ajudem a triar.",
    "Tu ritual,": "El teu ritual,",
    "también en casa.": "també a casa.",
    "¿Buscas algo concreto?": "Busques alguna cosa concreta?",
    "Escríbenos y prepararemos una recomendación para ti.":
      "Escriu-nos i prepararem una recomanació per a tu.",
    "Hablar con Nou Sol": "Parlar amb Nou Sol",
    "Hablemos de": "Parlem de",
    "Dinos qué necesitas y contactaremos contigo para confirmar tu cita o pedido.":
      "Digues-nos què necessites i contactarem amb tu per confirmar la cita o comanda.",
    Visítanos: "Visita'ns",
    Teléfono: "Telèfon",
    Móvil: "Mòbil",
    "También estamos en": "També som a",
    "Quiero una cita": "Vull una cita",
    "Quiero hacer un pedido": "Vull fer una comanda",
    "Nombre y apellidos": "Nom i cognoms",
    "Escribe tu nombre": "Escriu el teu nom",
    Servicio: "Servei",
    "¿Qué quieres pedir?": "Què vols demanar?",
    "Selecciona una opción": "Selecciona una opció",
    "Cuéntanos un poco más": "Explica'ns una mica més",
    "Disponibilidad, dudas o preferencias":
      "Disponibilitat, dubtes o preferències",
    "Producto, cantidad o consulta": "Producte, quantitat o consulta",
    "Acepto que me contacten para gestionar mi solicitud.":
      "Accepto que em contactin per gestionar la meva sol·licitud.",
    "Enviar solicitud": "Enviar sol·licitud",
    "Solicitud recibida": "Sol·licitud rebuda",
    "Gracias por escribirnos.": "Gràcies per escriure’ns.",
    "Te responderemos personalmente para confirmar todos los detalles.":
      "Et respondrem personalment per confirmar tots els detalls.",
    "Enviar otra solicitud": "Enviar una altra sol·licitud",
  },
  en: {
    Nosotras: "About us",
    Servicios: "Services",
    Pedidos: "Orders",
    Contacto: "Contact",
    "Pedir cita": "Book now",
    "Centro de estética · Sabadell": "Beauty centre · Sabadell",
    "Cuidado real · Resultados visibles": "Real care · Visible results",
    "Tu momento empieza aquí": "Your moment starts here",
    "Tu piel,": "Your skin,",
    "en buenas manos.": "in good hands.",
    "Estética avanzada": "Advanced aesthetics",
    "Tecnología y cuidado personalizado": "Technology and personalised care",
    "Descubrir tratamientos": "Discover treatments",
    "Resultados que se sienten. Rituales que se disfrutan. Un espacio pensado para ti.":
      "Results you can feel. Rituals you can enjoy. A space designed for you.",
    "Reserva tu cita": "Book your appointment",
    "Nuestra esencia": "Our essence",
    "Belleza consciente": "Conscious beauty",
    "Cuidarte no es un lujo.": "Self-care is not a luxury.",
    "Es volver a": "It is coming back to",
    ti: "you",
    "En Nou Sol entendemos la estética como un cuidado que empieza escuchándote. Cada piel, cada cuerpo y cada momento necesitan una atención diferente.":
      "At Nou Sol, beauty care starts with listening to you. Every skin, body and moment deserves a different approach.",
    "Combinamos experiencia, diagnóstico y productos seleccionados para crear rituales sencillos, efectivos y sin prisas, en Sabadell.":
      "We combine experience, diagnosis and selected products to create simple, effective and unrushed rituals in Sabadell.",
    "Conoce Nou Sol": "Discover Nou Sol",
    "Qué hacemos": "What we do",
    "Tu piel habla.": "Your skin speaks.",
    escuchamos: "we listen",
    "Ver todos los servicios": "View all services",
    "Estética facial": "Facial aesthetics",
    "Cuidado corporal": "Body care",
    "Mirada y belleza": "Eyes and beauty",
    "Diagnóstico y tratamientos personalizados para devolver equilibrio, luz y confort a tu piel.":
      "Personalised diagnosis and treatments to restore balance, radiance and comfort to your skin.",
    "Protocolos manuales y momentos de bienestar adaptados a lo que tu cuerpo necesita.":
      "Hands-on protocols and wellbeing moments tailored to what your body needs.",
    "Gestos precisos para realzar tu expresión con un resultado natural y cuidado.":
      "Precise treatments that enhance your expression with a natural, polished result.",
    "Sesiones de bronceado en cabina con tecnología ISOItalia® y atención personalizada.":
      "Tanning sessions with ISOItalia® technology and personalised attention.",
    "Tecnología aplicada a protocolos faciales y corporales adaptados a tus objetivos.":
      "Technology applied to facial and body protocols tailored to your goals.",
    "Depilación láser con valoración previa y un protocolo ajustado a cada persona.":
      "Laser hair removal with a prior assessment and a protocol tailored to each person.",
    "Tecnología estética corporal integrada en planes personalizados y con seguimiento.":
      "Body aesthetic technology integrated into personalised plans with follow-up.",
    "Protocolo de estética avanzada definido según tus necesidades y objetivos.":
      "An advanced aesthetics protocol defined around your needs and goals.",
    "Belleza con criterio": "Beauty with purpose",
    "No buscamos cambiarte.": "We are not here to change you.",
    "Queremos que te veas": "We want you to look",
    "más tú.": "more like you.",
    "Diagnóstico, manos expertas y una selección honesta de tratamientos. Sin excesos, sin prisas y con toda la atención puesta en ti.":
      "Diagnosis, expert hands and an honest treatment selection. No excess, no rush and all our attention on you.",
    "Nuestra filosofía": "Our philosophy",
    "Nuestra forma de hacer": "Our approach",
    "Menos promesas.": "Fewer promises.",
    "Más escucha, más criterio": "More listening, more expertise",
    "y más": "and more",
    cuidado: "care",
    "Conócenos en Instagram": "Meet us on Instagram",
    "¿Empezamos?": "Shall we begin?",
    "Reserva tu momento": "Book your moment",
    "Quiénes somos": "Who we are",
    "Cuidado que": "Care you can",
    "se nota.": "feel.",
    "Nuestros valores": "Our values",
    Escucha: "Listening",
    Criterio: "Expertise",
    Cercanía: "Warmth",
    Constancia: "Consistency",
    "Antes de recomendar, preguntamos. Antes de tratar, entendemos.":
      "Before recommending, we ask. Before treating, we understand.",
    "Elegimos lo que tu piel necesita, no lo que está de moda.":
      "We choose what your skin needs, not what is trending.",
    "Un trato humano, claro y sin prisas en cada visita.":
      "Human, clear and unrushed care at every visit.",
    "Los mejores resultados nacen de cuidar bien, cada día.":
      "The best results come from caring well, every day.",
    Tratamientos: "Treatments",
    "Elige cómo quieres": "Choose how you want to",
    "cuidarte hoy.": "care for yourself today.",
    "Reservar este servicio": "Book this service",
    "Tratamientos con": "Treatments with",
    "propósito.": "purpose.",
    "¿No sabes qué elegir?": "Not sure what to choose?",
    "Te ayudamos a encontrar el cuidado que mejor encaja contigo.":
      "We will help you find the care that suits you best.",
    Selección: "Selection",
    "El cuidado continúa": "Care continues",
    "en casa.": "at home.",
    "Encarga tus productos habituales, pide una recomendación o prepara un regalo especial. Confirmaremos disponibilidad y recogida.":
      "Order your usual products, ask for a recommendation or prepare a special gift. We will confirm availability and collection.",
    Solicitar: "Request",
    Ritual: "Ritual",
    Regalo: "Gift",
    "Rutina facial personalizada": "Personalised facial routine",
    "Tarjeta regalo Nou Sol": "Nou Sol gift card",
    "Producto recomendado": "Recommended product",
    "Una selección pensada según tu tipo de piel y tus objetivos.":
      "A selection designed around your skin type and goals.",
    "Regala tiempo, cuidado y una experiencia elegida a medida.":
      "Give time, care and a made-to-measure experience.",
    "Cuéntanos qué necesita tu piel y te ayudamos a elegir.":
      "Tell us what your skin needs and we will help you choose.",
    "Tu ritual,": "Your ritual,",
    "también en casa.": "also at home.",
    "¿Buscas algo concreto?": "Looking for something specific?",
    "Escríbenos y prepararemos una recomendación para ti.":
      "Write to us and we will prepare a recommendation for you.",
    "Hablar con Nou Sol": "Talk to Nou Sol",
    "Hablemos de": "Let's talk about",
    "Dinos qué necesitas y contactaremos contigo para confirmar tu cita o pedido.":
      "Tell us what you need and we will contact you to confirm your appointment or order.",
    Visítanos: "Visit us",
    Teléfono: "Telephone",
    Móvil: "Mobile",
    "También estamos en": "Find us on",
    "Quiero una cita": "I want an appointment",
    "Quiero hacer un pedido": "I want to place an order",
    "Nombre y apellidos": "Full name",
    "Escribe tu nombre": "Enter your name",
    Servicio: "Service",
    "¿Qué quieres pedir?": "What would you like to order?",
    "Selecciona una opción": "Select an option",
    "Cuéntanos un poco más": "Tell us a little more",
    "Disponibilidad, dudas o preferencias":
      "Availability, questions or preferences",
    "Producto, cantidad o consulta": "Product, quantity or question",
    "Acepto que me contacten para gestionar mi solicitud.":
      "I agree to be contacted to manage my request.",
    "Enviar solicitud": "Send request",
    "Solicitud recibida": "Request received",
    "Gracias por escribirnos.": "Thank you for writing to us.",
    "Te responderemos personalmente para confirmar todos los detalles.":
      "We will reply personally to confirm all the details.",
    "Enviar otra solicitud": "Send another request",
  },
}

type LanguageContextValue = {
  language: Language
  setLanguage: (language: Language) => void
  t: (text: string) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("zelisse-language")
    return saved === "ca" || saved === "en" ? saved : "es"
  })

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage)
    localStorage.setItem("zelisse-language", nextLanguage)
  }

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: (text: string) =>
        language === "es" ? text : (translations[language][text] ?? text),
    }),
    [language],
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context)
    throw new Error("useLanguage must be used within LanguageProvider")
  return context
}

const services = [
  {
    id: "anillos",
    number: "01",
    name: "Anillos",
    summary:
      "Piezas delicadas para combinar, regalar o convertir en ese anillo que siempre llevas contigo.",
    details: [
      "Diseños minimalistas",
      "Anillos con circonitas",
      "Acabados dorados",
      "Asesoramiento de talla",
    ],
    image:
      "https://images.unsplash.com/photo-1649810703076-55cc1293a9f7?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1400",
  },
  {
    id: "pendientes",
    number: "02",
    name: "Pendientes",
    summary:
      "Desde aros esenciales hasta piezas con personalidad para iluminar el rostro de forma natural.",
    details: [
      "Aros y criollas",
      "Pendientes de botón",
      "Diseños con perlas",
      "Piezas combinables",
    ],
    image:
      "https://images.unsplash.com/photo-1763628212781-7d52844cf358?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1400",
  },
  {
    id: "collares",
    number: "03",
    name: "Collares",
    summary:
      "Cadenas finas y colgantes pensados para llevar solos o crear composiciones muy personales.",
    details: [
      "Cadenas esenciales",
      "Colgantes",
      "Collares con piedras",
      "Combinaciones a capas",
    ],
    image:
      "https://images.unsplash.com/photo-1727791762060-978deff14028?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1400",
  },
  {
    id: "pulseras",
    number: "04",
    name: "Pulseras",
    summary:
      "Diseños ligeros que acompañan el movimiento y suman un punto de luz a cualquier look.",
    details: [
      "Cadenas finas",
      "Brazaletes",
      "Detalles con perla",
      "Medidas ajustables",
    ],
    image:
      "https://images.unsplash.com/photo-1606765729244-23fbdd754dd9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1400",
  },
  {
    id: "personalizadas",
    number: "05",
    name: "Piezas personalizadas",
    summary:
      "Creamos contigo una joya significativa para celebrar una historia, una fecha o una persona.",
    details: [
      "Idea y asesoramiento",
      "Elección de acabados",
      "Diseño a medida",
      "Seguimiento personal",
    ],
    image:
      "https://images.unsplash.com/photo-1626122780071-c09d403b8e32?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1400",
  },
  {
    id: "regalos",
    number: "06",
    name: "Regalos",
    summary:
      "Te ayudamos a encontrar una pieza especial y la preparamos para que regalar sea aún más bonito.",
    details: [
      "Selección personal",
      "Packaging cuidado",
      "Tarjeta con mensaje",
      "Recogida en Granollers",
    ],
    image:
      "https://images.unsplash.com/photo-1573575154350-35e29dfd6cdc?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1400",
  },
]

const products = [
  {
    id: "rutina",
    type: "Selección",
    name: "Tu combinación Zelisse",
    copy: "Creamos una composición de piezas pensada para tu estilo.",
    image:
      "https://images.unsplash.com/photo-1599458348985-236f9b110da1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200",
  },
  {
    id: "regalo",
    type: "Regalo",
    name: "Tarjeta regalo Zelisse",
    copy: "Regala la libertad de elegir una joya con significado.",
    image:
      "https://images.unsplash.com/photo-1727991053349-7985a6155ff4?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200",
  },
  {
    id: "consulta",
    type: "Selección",
    name: "Joya personalizada",
    copy: "Cuéntanos tu idea y la convertimos en una pieza solo tuya.",
    image:
      "https://images.unsplash.com/photo-1605089315599-ca966e96b56a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200",
  },
]

type ShopProduct = {
  id: string
  category: "Pulseras" | "Collares" | "Pendientes"
  name: string
  price: number
  image: string
}

const shopProducts: ShopProduct[] = [
  {
    id: "pulsera-aura",
    category: "Pulseras",
    name: "Pulsera Aura",
    price: 34,
    image:
      "https://images.unsplash.com/photo-1606765729244-23fbdd754dd9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
  },
  {
    id: "pulsera-lien",
    category: "Pulseras",
    name: "Pulsera Lien",
    price: 39,
    image:
      "https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
  },
  {
    id: "collar-celeste",
    category: "Collares",
    name: "Collar Celeste",
    price: 46,
    image:
      "https://images.unsplash.com/photo-1569397288884-4d43d6738fbd?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
  },
  {
    id: "collar-lumiere",
    category: "Collares",
    name: "Collar Lumière",
    price: 52,
    image:
      "https://images.unsplash.com/photo-1722410180644-5955f83ec8b1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
  },
  {
    id: "pendientes-nacre",
    category: "Pendientes",
    name: "Pendientes Nacre",
    price: 32,
    image:
      "https://images.unsplash.com/photo-1763628212781-7d52844cf358?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
  },
  {
    id: "pendientes-soleil",
    category: "Pendientes",
    name: "Pendientes Soleil",
    price: 36,
    image:
      "https://images.unsplash.com/photo-1727791653790-2f2a64a37c7f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
  },
]

type CartItem = { product: ShopProduct quantity: number }

type CartContextValue = {
  items: CartItem[]
  count: number
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  addItem: (product: ShopProduct) => void
  changeQuantity: (id: string, change: number) => void
  removeItem: (id: string) => void
}

const CartContext = createContext<CartContextValue | null>(null)

function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("zelisse-cart") ?? "[]")
    } catch {
      return []
    }
  })
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem("zelisse-cart", JSON.stringify(items))
  }, [items])

  useEffect(() => {
    if (!isOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false)
    }
    window.addEventListener("keydown", closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", closeOnEscape)
    }
  }, [isOpen])

  const addItem = (product: ShopProduct) => {
    setItems((current) => {
      const existing = current.find((item) => item.product.id === product.id)
      return existing
        ? current.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [...current, { product, quantity: 1 }]
    })
    setIsOpen(true)
  }

  const changeQuantity = (id: string, change: number) => {
    setItems((current) =>
      current
        .map((item) =>
          item.product.id === id
            ? { ...item, quantity: item.quantity + change }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const removeItem = (id: string) => {
    setItems((current) => current.filter((item) => item.product.id !== id))
  }

  return (
    <CartContext.Provider
      value={{
        items,
        count: items.reduce((total, item) => total + item.quantity, 0),
        isOpen,
        setIsOpen,
        addItem,
        changeQuantity,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within CartProvider")
  return context
}

function ArrowIcon({ direction = "right" }: { direction?: "right" | "down" }) {
  return (
    <svg
      aria-hidden="true"
      className={`arrow-icon ${direction === "down" ? "rotate-90" : ""}`}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path d="M5 12h14M14 7l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function BagIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path
        d="M5.5 8.5h13l-1 11h-11l-1-11ZM9 9V6.5a3 3 0 0 1 6 0V9"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  )
}

function CartTrigger({ mobile = false }: { mobile?: boolean }) {
  const { count, setIsOpen } = useCart()
  return (
    <button
      className={`cart-trigger ${mobile ? "cart-trigger--mobile" : ""}`}
      onClick={() => setIsOpen(true)}
      aria-label={`Abrir carrito, ${count} ${
        count === 1 ? "artículo" : "artículos"
      }`}
    >
      <BagIcon />
      <span>{count}</span>
    </button>
  )
}

function InstagramIcon() {
  return (
    <svg
      aria-hidden="true"
      className="social-icon"
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="4.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="17.4" cy="6.7" r="1" fill="currentColor" />
    </svg>
  )
}

function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <span className={`wordmark ${light ? "text-paper" : ""}`}>
      ZELISSE<span>.</span>
    </span>
  )
}

function LanguageSwitcher({ mobile = false }: { mobile?: boolean }) {
  const { language, setLanguage } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", close)
    return () => document.removeEventListener("mousedown", close)
  }, [open])

  return (
    <div
      ref={ref}
      className={`language-switcher ${
        mobile ? "language-switcher--mobile" : ""
      }`}
    >
      <button
        className="language-trigger"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Cambiar idioma"
      >
        <span>{language.toUpperCase()}</span>
        <svg aria-hidden="true" viewBox="0 0 12 12" fill="none">
          <path d="m3 4.5 3 3 3-3" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </button>
      {open && (
        <div className="language-menu" role="listbox" aria-label="Idioma">
          {(Object.keys(languageNames) as Language[]).map((option) => (
            <button
              key={option}
              role="option"
              aria-selected={language === option}
              className={language === option ? "is-active" : ""}
              onClick={() => {
                setLanguage(option)
                setOpen(false)
              }}
            >
              <span>{option.toUpperCase()}</span>
              {languageNames[option]}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { t } = useLanguage()
  const isHome = location.pathname === "/"
  const solid = scrolled || open || !isHome

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", closeOnEscape)
    }
  }, [open])

  const navItems = [
    ["La firma", "/nosotras"],
    ["Colecciones", "/servicios"],
    ["Regalos", "/pedidos"],
    ["Contacto", "/contacto"],
  ]

  return (
    <>
      <header
        className={`site-header ${solid ? "site-header--solid" : ""} ${
          open ? "site-header--menu-open" : ""
        }`}
      >
        <Link className="logo-button" to="/" aria-label="Ir a la portada">
          <Wordmark light={!solid} />
        </Link>

        <nav className="desktop-nav" aria-label="Navegación principal">
          {navItems.map(([label, path]) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `nav-link ${isActive ? "is-active" : ""}`
              }
            >
              {t(label)}
            </NavLink>
          ))}
        </nav>

        <div className="header-tools">
          <Link className="header-cta" to="/contacto">
            {t("Descubrir piezas")} <ArrowIcon />
          </Link>
          <CartTrigger />
        </div>

        <CartTrigger mobile />
        <button
          className="menu-button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          <span />
          <span />
        </button>
      </header>

      {open &&
        createPortal(
          <div className="mobile-menu">
            {navItems.map(([label, path], index) => (
              <Link key={path} to={path} className="mobile-link">
                <span>0{index + 1}</span>
                {t(label)}
              </Link>
            ))}
            <div className="mobile-menu-footer">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="mobile-instagram"
              >
                @zelisse.jewelry <InstagramIcon />
              </a>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}

function CartDrawer() {
  const { items, isOpen, setIsOpen, changeQuantity, removeItem } = useCart()
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  )
  const order = items
    .map(
      (item) =>
        `${item.quantity} × ${item.product.name} (${(
          item.product.price * item.quantity
        ).toLocaleString("es-ES", { style: "currency", currency: "EUR" })})`,
    )
    .join("\n")
  const whatsappUrl = `https://wa.me/34681129570?text=${encodeURIComponent(
    `Hola Zelisse, me gustaría realizar este pedido:\n\n${order}\n\nTotal: ${formatPrice(total)}`,
  )}`

  if (!isOpen) return null

  return createPortal(
    <div className="cart-layer" role="presentation">
      <button
        className="cart-backdrop"
        onClick={() => setIsOpen(false)}
        aria-label="Cerrar carrito"
      />
      <aside
        className="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        <div className="cart-head">
          <div>
            <span>Tu selección</span>
            <h2 id="cart-title">Carrito</h2>
          </div>
          <button
            className="cart-close"
            onClick={() => setIsOpen(false)}
            aria-label="Cerrar carrito"
          >
            <span />
            <span />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <BagIcon />
            <h3>Tu carrito está vacío.</h3>
            <p>Descubre las piezas Zelisse y guarda aquí tus favoritas.</p>
            <button onClick={() => setIsOpen(false)} className="text-link">
              Seguir descubriendo <ArrowIcon />
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map(({ product, quantity }) => (
                <article className="cart-item" key={product.id}>
                  <img src={product.image} alt={product.name} />
                  <div className="cart-item-copy">
                    <span>{product.category}</span>
                    <h3>{product.name}</h3>
                    <p>{formatPrice(product.price)}</p>
                    <div className="quantity-control">
                      <button
                        onClick={() => changeQuantity(product.id, -1)}
                        aria-label={`Quitar una unidad de ${product.name}`}
                      >
                        −
                      </button>
                      <span>{quantity}</span>
                      <button
                        onClick={() => changeQuantity(product.id, 1)}
                        aria-label={`Añadir una unidad de ${product.name}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="cart-remove"
                    onClick={() => removeItem(product.id)}
                    aria-label={`Eliminar ${product.name}`}
                  >
                    Eliminar
                  </button>
                </article>
              ))}
            </div>
            <div className="cart-summary">
              <div>
                <span>Total</span>
                <strong>{formatPrice(total)}</strong>
              </div>
              <p>
                Recogida en Granollers. Confirmaremos disponibilidad contigo.
              </p>
              <a href={whatsappUrl} target="_blank" rel="noreferrer">
                Finalizar pedido por WhatsApp <ArrowIcon />
              </a>
            </div>
          </>
        )}
      </aside>
    </div>,
    document.body,
  )
}

function Footer() {
  const { t } = useLanguage()
  return (
    <footer>
      <div className="footer-top">
        <Wordmark light />
        <p>
          Granollers · Barcelona
          <br />
          Atención con cita previa
          <br />
          <a href="tel:+34681129570">+34 681 12 95 70</a>
        </p>
        <nav aria-label="Enlaces del pie">
          <Link to="/servicios">{t("Colecciones")}</Link>
          <Link to="/pedidos">{t("Regalos")}</Link>
          <Link to="/contacto">{t("Contactar")}</Link>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
            Instagram
          </a>
        </nav>
        <a
          className="footer-instagram"
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
        >
          <InstagramIcon />
        </a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Zelisse Jewelry</span>
        <span>Joyas para guardar historias · Granollers</span>
      </div>
    </footer>
  )
}

function ScrollManager() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [pathname])
  return null
}

function RootLayout() {
  return (
    <CartProvider>
      <LanguageProvider>
        <div className="app-shell">
          <ScrollManager />
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
          <CartDrawer />
        </div>
      </LanguageProvider>
    </CartProvider>
  )
}

function Hero() {
  const { t } = useLanguage()
  return (
    <section className="hero">
      <img
        src="https://images.unsplash.com/photo-1727791653790-2f2a64a37c7f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=90&w=2400"
        alt="Retrato editorial con joyas doradas Zelisse"
        className="hero-image"
      />
      <div className="hero-shade" />
      <div className="hero-brand" aria-hidden="true">
        ZELISSE
      </div>
      <div className="hero-content">
        <div className="hero-topline">
          <p className="eyebrow eyebrow--light">
            {t("Joyería contemporánea · Granollers")}
          </p>
          <p className="hero-edition">{t("Colección esencial · 2025")}</p>
        </div>
        <div className="hero-title-wrap">
          <span className="hero-kicker">{t("Joyas para hacerlas tuyas")}</span>
          <h1>
            {t("Pequeños gestos,")}
            <br />
            <em>{t("grandes historias.")}</em>
          </h1>
        </div>
        <aside className="hero-treatment-card">
          <div className="hero-treatment-image">
            <img
              src="https://images.unsplash.com/photo-1605089315599-ca966e96b56a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=82&w=500"
              alt="Anillo dorado sobre tejido oscuro"
            />
          </div>
          <div>
            <span>01 / ZELISSE</span>
            <h2>{t("Nueva colección")}</h2>
            <p>{t("Piezas sutiles, carácter propio")}</p>
            <Link to="/servicios">
              {t("Ver colección")} <ArrowIcon />
            </Link>
          </div>
        </aside>
        <div className="hero-bottom">
          <p>
            {t(
              "Joyas versátiles, detalles cuidados y piezas elegidas para acompañarte cada día.",
            )}
          </p>
          <div className="hero-actions">
            <Link to="/contacto" className="hero-primary-link">
              {t("Encuentra tu joya")} <ArrowIcon />
            </Link>
            <Link
              to="/servicios"
              className="circle-link"
              aria-label="Descubrir servicios"
            >
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </div>
      <span className="hero-index">ZELISSE / GRANOLLERS</span>
    </section>
  )
}

function CareStrip() {
  return (
    <div className="care-strip" aria-label="Especialidades">
      <div>
        {[
          "ANILLOS",
          "PENDIENTES",
          "COLLARES",
          "PULSERAS",
          "REGALOS",
          "PIEZAS ÚNICAS",
        ].map((item, index) => (
          <span key={`${item}-${index}`}>
            {item} <i aria-hidden="true">·</i>
          </span>
        ))}
      </div>
    </div>
  )
}

function Introduction({ extended = false }: { extended?: boolean }) {
  const { t } = useLanguage()
  return (
    <section
      className={`section-shell intro-section ${
        extended ? "intro-section--extended" : ""
      }`}
    >
      <div className="section-label">
        <span>01</span>
        <p>{t("Nuestra esencia")}</p>
      </div>
      <div className="intro-copy">
        <p className="eyebrow">{t("Joyería con intención")}</p>
        <h2>
          {t("Una joya no adorna.")}
          <br />
          {t("Cuenta algo de")} <em>{t("ti")}.</em>
        </h2>
        <div className="intro-columns">
          <p>
            {t(
              "En Zelisse creemos en las joyas que se vuelven parte de ti: piezas delicadas, fáciles de llevar y con ese detalle capaz de transformar lo cotidiano.",
            )}
          </p>
          <p>
            {t(
              "Seleccionamos cada diseño con sensibilidad y te acompañamos de forma cercana para encontrar una pieza con la que conectes de verdad, en Granollers.",
            )}
          </p>
        </div>
        {!extended && (
          <Link to="/nosotras" className="text-link intro-more">
            {t("Conoce Zelisse")} <ArrowIcon />
          </Link>
        )}
      </div>
      <div className="intro-stamp" aria-hidden="true">
        <span>ZJ</span>
        <small>GRANOLLERS · BCN</small>
      </div>
    </section>
  )
}

function HomeServices() {
  const { t } = useLanguage()
  return (
    <section className="home-services">
      <div className="section-shell">
        <div className="home-services-head">
          <p className="eyebrow">{t("La colección")}</p>
          <h2>
            {t("Piezas para llevar.")}
            <br />
            {t("Historias para")} <em>{t("guardar")}.</em>
          </h2>
          <Link to="/servicios" className="text-link text-link--light">
            {t("Ver todas las piezas")} <ArrowIcon />
          </Link>
        </div>
        <div className="home-services-grid">
          {services.slice(0, 3).map((service) => (
            <Link
              to="/servicios"
              key={service.id}
              className="home-service-card"
            >
              <img src={service.image} alt={service.name} />
              <span>{service.number}</span>
              <h3>{t(service.name)}</h3>
              <ArrowIcon />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function QuoteSection({
  image = "https://images.unsplash.com/photo-1709045918193-260fd6f8ee70?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1600",
}: {
  image?: string
}) {
  const { t } = useLanguage()
  return (
    <section className="quote-section">
      <div className="quote-image">
        <img src={image} alt="Retrato editorial con anillos dorados" />
      </div>
      <div className="quote-copy">
        <p className="eyebrow">{t("Nuestra forma de mirar")}</p>
        <blockquote>
          “{t("Menos ruido.")}
          <br />
          {t("Más intención, más belleza")}
          <br />
          {t("y más")} <em>{t("significado")}.</em>”
        </blockquote>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className="text-link"
        >
          {t("Conócenos en Instagram")} <ArrowIcon />
        </a>
      </div>
    </section>
  )
}

function HomeEditorial() {
  const { t } = useLanguage()
  return (
    <section className="home-editorial">
      <div className="editorial-main">
        <img
          src="https://images.unsplash.com/photo-1573575154350-35e29dfd6cdc?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=88&w=1500"
          alt="Selección de anillos dorados junto a un libro"
        />
        <span>01 / Detalle</span>
      </div>
      <div className="editorial-copy">
        <p className="eyebrow">{t("El lujo de lo personal")}</p>
        <h2>
          {t("No se trata de llevar más.")}
          <br />
          {t("Se trata de elegir")}
          <br />
          <em>{t("mejor.")}</em>
        </h2>
        <p>
          {t(
            "Una selección honesta de piezas contemporáneas para celebrar tu estilo, regalar emociones y acompañar momentos que merecen quedarse.",
          )}
        </p>
        <Link to="/nosotras" className="text-link">
          {t("Nuestra historia")} <ArrowIcon />
        </Link>
      </div>
      <div className="editorial-detail">
        <img
          src="https://images.unsplash.com/photo-1763628212781-7d52844cf358?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900"
          alt="Pendiente dorado con perla"
        />
        <span>02 / Luz</span>
      </div>
    </section>
  )
}

function HomePage() {
  const { t } = useLanguage()
  return (
    <>
      <Hero />
      <CareStrip />
      <Introduction />
      <HomeEditorial />
      <HomeServices />
      <QuoteSection />
      <section className="home-final-cta">
        <p>{t("¿Empezamos?")}</p>
        <Link to="/contacto">
          {t("Descubre tu próxima joya en")} <em>Zelisse</em>
          <ArrowIcon />
        </Link>
      </section>
    </>
  )
}

function PageHero({
  index,
  eyebrow,
  title,
  italic,
  image,
}: {
  index: string
  eyebrow: string
  title: string
  italic: string
  image: string
}) {
  const { t } = useLanguage()
  return (
    <section className="page-hero">
      <div className="page-hero-copy">
        <p className="eyebrow">{t(eyebrow)}</p>
        <span className="page-number">{index} / 04</span>
        <h1>
          {t(title)}
          <br />
          <em>{t(italic)}</em>
        </h1>
      </div>
      <div className="page-hero-image">
        <img src={image} alt="" />
      </div>
    </section>
  )
}

function AboutPage() {
  const { t } = useLanguage()
  return (
    <>
      <PageHero
        index="01"
        eyebrow="La firma"
        title="Joyas que"
        italic="permanecen."
        image="https://images.unsplash.com/photo-1598219062199-a940294982e7?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1600"
      />
      <Introduction extended />
      <section className="values-section">
        <div className="section-shell">
          <div className="section-label">
            <span>ZJ</span>
            <p>{t("Lo que nos mueve")}</p>
          </div>
          <div className="values-grid">
            {[
              [
                "01",
                "Intención",
                "Cada pieza se elige por lo que transmite, no solo por cómo brilla.",
                "https://images.unsplash.com/photo-1626122780071-c09d403b8e32?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=900",
              ],
              [
                "02",
                "Calidad",
                "Seleccionamos acabados cuidados y diseños hechos para disfrutarse mucho.",
                "https://images.unsplash.com/photo-1605089315599-ca966e96b56a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=900",
              ],
              [
                "03",
                "Cercanía",
                "Te asesoramos con honestidad para que encuentres una joya verdaderamente tuya.",
                "https://images.unsplash.com/photo-1649810703076-55cc1293a9f7?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=900",
              ],
              [
                "04",
                "Emoción",
                "Porque una joya puede guardar una fecha, un vínculo o un nuevo comienzo.",
                "https://images.unsplash.com/photo-1772403022090-f4ab64c6786b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=900",
              ],
            ].map(([number, title, copy, image]) => (
              <article key={number}>
                <img src={image} alt="" />
                <div className="value-content">
                  <span>{number}</span>
                  <h2>{t(title)}</h2>
                  <p>{t(copy)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <QuoteSection image="https://images.unsplash.com/photo-1754680837239-cfe387461287?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1600" />
    </>
  )
}

function ServicesSection() {
  const [active, setActive] = useState(0)
  const current = services[active]
  const { t } = useLanguage()

  return (
    <section className="services-section">
      <div className="section-shell">
        <div className="section-heading">
          <div className="section-label section-label--light">
            <span>01—06</span>
            <p>{t("Categorías")}</p>
          </div>
          <h2>
            {t("Encuentra la pieza")}
            <br />
            <em>{t("que habla de ti.")}</em>
          </h2>
        </div>
        <div className="services-layout">
          <div className="service-list">
            {services.map((service, index) => {
              const isActive = active === index
              return (
                <article
                  key={service.id}
                  className={`service-row ${isActive ? "is-active" : ""}`}
                >
                  <button
                    onClick={() => setActive(index)}
                    aria-expanded={isActive}
                  >
                    <span className="service-number">{service.number}</span>
                    <span className="service-name">{t(service.name)}</span>
                    <span className="service-toggle">
                      {isActive ? "−" : "+"}
                    </span>
                  </button>
                  {isActive && (
                    <div className="service-detail">
                      <p>{t(service.summary)}</p>
                      <ul>
                        {service.details.map((item) => (
                          <li key={item}>{t(item)}</li>
                        ))}
                      </ul>
                      <Link
                        to={`/contacto?servicio=${encodeURIComponent(service.name)}`}
                        className="text-link text-link--light"
                      >
                        {t("Consultar esta pieza")} <ArrowIcon />
                      </Link>
                    </div>
                  )}
                </article>
              )
            })}
          </div>
          <div className="service-visual">
            <img key={current.id} src={current.image} alt={current.name} />
            <span>{current.number} / 06</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function ShopSection() {
  const { addItem } = useCart()
  return (
    <section className="shop-section">
      <div className="section-shell">
        <div className="shop-heading">
          <div>
            <p className="eyebrow">Comprar online</p>
            <h2>
              Una pieza para
              <br />
              <em>cada historia.</em>
            </h2>
          </div>
          <p>
            Pulseras, collares y pendientes seleccionados para llevar cada día.
            Añade tus favoritos al carrito y finaliza el pedido directamente con
            nosotras.
          </p>
        </div>
        <div className="shop-grid">
          {shopProducts.map((product) => (
            <article className="shop-card" key={product.id}>
              <div className="shop-image">
                <img src={product.image} alt={product.name} />
                <span>{product.category}</span>
              </div>
              <div className="shop-meta">
                <div>
                  <h3>{product.name}</h3>
                  <p>{formatPrice(product.price)}</p>
                </div>
                <button onClick={() => addItem(product)}>
                  Añadir al carrito <span aria-hidden="true">+</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServicesPage() {
  return (
    <>
      <PageHero
        index="02"
        eyebrow="Colecciones"
        title="Detalles con"
        italic="significado."
        image="https://images.unsplash.com/photo-1633701394188-c11a1e6a4e26?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1600"
      />
      <ServicesSection />
      <ShopSection />
      <PageCta
        label="¿No sabes qué elegir?"
        copy="Te ayudamos a encontrar esa pieza que se siente hecha para ti."
      />
    </>
  )
}

function OrdersSection() {
  const { t } = useLanguage()
  return (
    <section className="section-shell orders-section">
      <div className="section-heading section-heading--ink">
        <div className="section-label">
          <span>01—03</span>
          <p>{t("Selección")}</p>
        </div>
        <h2>
          {t("Hay regalos que")}
          <br />
          <em>{t("se recuerdan.")}</em>
        </h2>
        <p className="heading-aside">
          {t(
            "Elige una pieza, pide una recomendación o crea un detalle personal. Confirmaremos disponibilidad y opciones de recogida en Granollers.",
          )}
        </p>
      </div>
      <div className="product-grid">
        {products.map((product, index) => (
          <article className="product-card" key={product.id}>
            <div className="product-image-wrap">
              <img src={product.image} alt={product.name} />
              <span>0{index + 1}</span>
            </div>
            <div className="product-meta">
              <p>{t(product.type)}</p>
              <h3>{t(product.name)}</h3>
              <span>{t(product.copy)}</span>
              <Link
                to={`/contacto?pedido=${encodeURIComponent(product.name)}`}
                className="text-link"
              >
                {t("Solicitar")} <ArrowIcon />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function OrdersPage() {
  return (
    <>
      <PageHero
        index="03"
        eyebrow="Regalos"
        title="Una forma bonita"
        italic="de decirlo."
        image="https://images.unsplash.com/photo-1727791762060-978deff14028?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1600"
      />
      <OrdersSection />
      <PageCta
        label="¿Buscas algo concreto?"
        copy="Cuéntanos para quién es y prepararemos una recomendación personal."
      />
    </>
  )
}

function PageCta({ label, copy }: { label: string copy: string }) {
  const { t } = useLanguage()
  return (
    <section className="page-cta">
      <p className="eyebrow eyebrow--light">{t(label)}</p>
      <h2>{t(copy)}</h2>
      <Link to="/contacto" className="text-link text-link--light">
        {t("Hablar con Zelisse")} <ArrowIcon />
      </Link>
    </section>
  )
}

type RequestMode = "cita" | "pedido"

function ContactForm() {
  const { t } = useLanguage()
  const [searchParams] = useSearchParams()
  const requestedProduct = searchParams.get("pedido") ?? ""
  const requestedService = searchParams.get("servicio") ?? ""
  const [mode, setMode] = useState<RequestMode>(
    requestedProduct ? "pedido" : "cita",
  )
  const [sent, setSent] = useState(false)
  const selected = requestedProduct || requestedService
  const subjectOptions = useMemo(
    () =>
      mode === "cita"
        ? services.map((service) => service.name)
        : products.map((product) => product.name),
    [mode],
  )

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSent(true)
  }

  return (
    <section className="contact-section contact-page-section">
      <div className="section-shell contact-layout">
        <div className="contact-intro">
          <div className="section-label">
            <span>04</span>
            <p>{t("Contacto")}</p>
          </div>
          <h2>
            {t("Encuentra tu pieza")}
            <br />
            <em>Zelisse.</em>
          </h2>
          <p>
            {t(
              "Cuéntanos qué buscas y te responderemos personalmente para ayudarte con tu joya o regalo.",
            )}
          </p>
          <div className="contact-details">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Granollers+Barcelona"
              target="_blank"
              rel="noreferrer"
            >
              <span>{t("Visítanos")}</span>
              Granollers · Barcelona
            </a>
            <div>
              <a href="tel:+34681129570">
                <span>{t("Teléfono")}</span>
                +34 681 12 95 70
              </a>
            </div>
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="instagram-link"
          >
            <InstagramIcon />
            <span>
              {t("También estamos en")}
              <strong>@zelisse.jewelry</strong>
            </span>
          </a>
        </div>
        <div className="form-panel">
          <div
            className="mode-switch"
            role="tablist"
            aria-label="Tipo de solicitud"
          >
            <button
              role="tab"
              aria-selected={mode === "cita"}
              className={mode === "cita" ? "is-active" : ""}
              onClick={() => {
                setMode("cita")
                setSent(false)
              }}
            >
              {t("Quiero asesoramiento")}
            </button>
            <button
              role="tab"
              aria-selected={mode === "pedido"}
              className={mode === "pedido" ? "is-active" : ""}
              onClick={() => {
                setMode("pedido")
                setSent(false)
              }}
            >
              {t("Quiero encargar una joya")}
            </button>
          </div>
          {sent ? (
            <div className="success-message">
              <span>{t("Solicitud recibida")}</span>
              <h3>{t("Gracias por escribirnos.")}</h3>
              <p>
                {t(
                  "Te responderemos personalmente para confirmar todos los detalles.",
                )}
              </p>
              <button onClick={() => setSent(false)} className="text-link">
                {t("Enviar otra solicitud")} <ArrowIcon />
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="request-form">
              <label>
                <span>{t("Nombre y apellidos")}</span>
                <input
                  name="name"
                  required
                  placeholder={t("Escribe tu nombre")}
                />
              </label>
              <label>
                <span>{t("Teléfono")}</span>
                <input
                  name="phone"
                  required
                  type="tel"
                  placeholder="Tu número de contacto"
                />
              </label>
              <label className="form-full">
                <span>
                  {t(mode === "cita" ? "Categoría" : "¿Qué quieres encargar?")}
                </span>
                <select
                  key={`${mode}-${selected}`}
                  name="subject"
                  defaultValue={selected}
                >
                  <option value="">{t("Selecciona una opción")}</option>
                  {subjectOptions.map((option) => (
                    <option key={option} value={option}>
                      {t(option)}
                    </option>
                  ))}
                </select>
              </label>
              <label className="form-full">
                <span>{t("Cuéntanos un poco más")}</span>
                <textarea
                  name="message"
                  rows={3}
                  placeholder={t(
                    mode === "cita"
                      ? "Estilo, ocasión o dudas"
                      : "Pieza, talla o idea especial",
                  )}
                />
              </label>
              <label className="privacy-check form-full">
                <input type="checkbox" required />
                <span>
                  {t("Acepto que me contacten para gestionar mi solicitud.")}
                </span>
              </label>
              <button type="submit" className="submit-button form-full">
                {t("Enviar solicitud")} <ArrowIcon />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function ContactPage() {
  return (
    <>
      <PageHero
        index="04"
        eyebrow="Contacto"
        title="Tu próxima joya"
        italic="empieza aquí."
        image="https://images.unsplash.com/photo-1599458348985-236f9b110da1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1600"
      />
      <ContactForm />
    </>
  )
}

function NotFoundPage() {
  return (
    <section className="not-found">
      <span>404</span>
      <h1>Esta joya todavía no forma parte de la colección.</h1>
      <Link to="/" className="text-link">
        Volver a Zelisse <ArrowIcon />
      </Link>
    </section>
  )
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "nosotras", Component: AboutPage },
      { path: "servicios", Component: ServicesPage },
      { path: "pedidos", Component: OrdersPage },
      { path: "contacto", Component: ContactPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
])
