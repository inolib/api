// import {
//   Body,
//   Column,
//   Container,
//   Font,
//   Head,
//   Heading,
//   Html,
//   Img,
//   Link,
//   Row,
//   Section,
//   Text,
// } from "@react-email/components";
// import { styles } from "./styles";
// import type { Booking } from "../stripe/webhook";

// type Props = {
//   booking?: Booking | undefined;
// };

// const toLocaleDateString = (datetime: string) =>
//   new Date(datetime)
//     .toLocaleDateString("fr-FR", {
//       day: "numeric",
//       month: "long",
//       year: "numeric",
//     })
//     .replace(" ", " ");

// const toLocaleTimeString = (datetime: string) =>
//   new Date(datetime)
//     .toLocaleTimeString("fr-FR", { hour: "2-digit" })
//     .replace(" ", " ");

// const ThanksEmail = ({
//   booking = {
//     datetime: "2023-11-21T11:00:00.000Z",
//     firstName: "Matthieu",
//     lastName: "MEIGNAN",
//     organization: "INOLIB",
//     organizationTitle: "CTO",
//     email: "matthieu.meignan@inolib.com",
//     tel: "+33 6 73 90 19 32",
//   },
// }: Props) => {
//   return (
//     <Html lang="fr" style={styles.html}>
//       <Head>
//         <Font
//           fallbackFontFamily="Verdana"
//           fontFamily="Atkinson Hyperlegible"
//           fontStyle="normal"
//           fontWeight={400}
//           webFont={{
//             url: "https://fonts.gstatic.com/s/atkinsonhyperlegible/v11/9Bt23C1KxNDXMspQ1lPyU89-1h6ONRlW45G04pIo.woff2",
//             format: "woff2",
//           }}
//         />

//         <Font
//           fallbackFontFamily="Verdana"
//           fontFamily="Atkinson Hyperlegible"
//           fontStyle="normal"
//           fontWeight={700}
//           webFont={{
//             url: "https://fonts.gstatic.com/s/atkinsonhyperlegible/v11/9Bt73C1KxNDXMspQ1lPyU89-1h6ONRlW45G8Wbc9dCWP.woff2",
//             format: "woff2",
//           }}
//         />
//       </Head>

//       <Body style={styles.body}>
//         <Container style={styles.container}>
//           <Img
//             alt=""
//             src="/static/banner.jpg"
//             style={styles.banner}
//             width={792}
//             height={198}
//           />

//           <Section aria-labelledby="main-title" style={styles.main}>
//             <Heading as="h1" id="main-title" style={styles.h1}>
//               Merci pour votre réservation !
//             </Heading>

//             <Text style={styles.text}>Bonjour {booking.firstName},</Text>

//             <Text style={styles.text}>
//               Nous vous donnons rendez-vous le{" "}
//               {toLocaleDateString(booking.datetime)} à{" "}
//               {toLocaleTimeString(booking.datetime)} pour assister à la
//               conférence « L’accessibilité numérique, un monde d’opportunités ».
//             </Text>

//             <Text style={styles.text}>
//               Djebrine ALOUI, fondateur et CEO d’INOLIB, vous présentera les
//               enjeux de l’accessibilité aujourd’hui et vous repartirez avec des
//               directives claires pour entreprendre vos premières démarches vers
//               l’accessibilité numérique.
//             </Text>

//             <Text style={styles.text}>
//               Vous recevrez un e-mail avec un lien de participation à la
//               conférence en ligne quelques jours avant la date prévue.
//             </Text>
//           </Section>

//           <Section aria-label="" style={styles.footer}>
//             <Row>
//               <Column style={{ ...styles.textWhite, ...styles.textSmall }}>
//                 INOLIB © 2023 Tous droits réservés
//               </Column>

//               <Column style={{ textAlign: "right" }}>
//                 <Text
//                   style={{
//                     ...styles.textWhite,
//                     ...styles.textSmall,
//                     display: "inline-block",
//                     marginRight: "0.25rem",
//                   }}
//                 >
//                   Retrouvez-nous sur
//                 </Text>

//                 <ul
//                   style={{
//                     ...styles.list,
//                     ...styles.textSmall,
//                     display: "inline-block",
//                   }}
//                 >
//                   <li style={styles.listItem}>
//                     <Link href="https://www.youtube.com/@inolib287">
//                       <Img
//                         alt="YouTube"
//                         src="/static/youtube.png"
//                         width={12}
//                         height={8.5}
//                         style={{
//                           marginRight: "0.25rem",
//                           position: "relative",
//                           // top: "-1.75px",
//                         }}
//                       />
//                     </Link>
//                   </li>

//                   <li style={styles.listItem}>
//                     <Link href="https://fr.linkedin.com/company/inolib">
//                       <Img
//                         alt="LinkedIn"
//                         src="/static/linkedin.png"
//                         width={10}
//                         height={10}
//                       />
//                     </Link>
//                   </li>
//                 </ul>
//               </Column>
//             </Row>
//           </Section>
//         </Container>
//       </Body>
//     </Html>
//   );
// };

// export default ThanksEmail;
