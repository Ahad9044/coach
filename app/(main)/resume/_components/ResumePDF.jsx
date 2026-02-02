import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

// Simple markdown → lines (minimal parser)
const parseMarkdown = (markdown = "") =>
  markdown
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
    marginBottom: 12,
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

export default function ResumePDF({ content }) {
  const lines = parseMarkdown(content);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {lines.map((line, i) => (
          <View key={i} style={styles.section}>
            {line.startsWith("## ") ? (
              <Text style={styles.heading}>{line.replace("## ", "")}</Text>
            ) : (
              <Text style={styles.text}>{line}</Text>
            )}
          </View>
        ))}
      </Page>
    </Document>
  );
}
