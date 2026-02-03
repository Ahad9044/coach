import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

/**
 * Convert HTML → plain readable text
 * React-PDF does NOT support HTML
 */
const htmlToText = (html = "") => {
  if (typeof window === "undefined") return html;

  const div = document.createElement("div");
  div.innerHTML = html;

  return (
    div.textContent ||
    div.innerText ||
    ""
  )
    .replace(/\u00A0/g, " ") // remove non-breaking spaces
    .replace(/[=�¼ñç]/g, "") // remove icon-font garbage
    .trim();
};

/**
 * Minimal markdown parser
 * - supports ## headings
 * - splits into lines
 */
const parseMarkdown = (text = "") =>
  text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontSize: 11,
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 6,
  },
  text: {
    marginBottom: 4,
    lineHeight: 1.4,
  },
});

export default function ResumePDF({ content = "" }) {
  const cleanText = htmlToText(content);
  const lines = parseMarkdown(cleanText);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {lines.map((line, index) => (
          <View key={index} style={styles.section}>
            {line.startsWith("## ") ? (
              <Text style={styles.heading}>
                {line.replace("## ", "")}
              </Text>
            ) : (
              <Text style={styles.text}>{line}</Text>
            )}
          </View>
        ))}
      </Page>
    </Document>
  );
}
