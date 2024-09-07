import React, { useState } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import './ContractCreation.css';

// Create styles for PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
  }
});

// Create Document Component
const MyDocument = ({ contractText }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Contract Agreement</Text>
        <Text style={styles.text}>{contractText}</Text>
      </View>
    </Page>
  </Document>
);

const ContractCreation = () => {
    const [formData, setFormData] = useState({
        customerName: '',
        produceType: '',
        amount: '',
        price: '',
        requirements: '',
        deliveryDate: ''
    });
    const [contract, setContract] = useState(null);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const generateContract = (e) => {
        e.preventDefault();
        const currentDate = new Date().toLocaleDateString();
        const contractText = `This Contract Agreement is made and entered into on ${currentDate} between [Farmer Name] (hereinafter referred to as "the Farmer") and ${formData.customerName} (hereinafter referred to as "the Customer").

The Farmer agrees to supply and the Customer agrees to purchase ${formData.amount} units of ${formData.produceType} at a price of $${formData.price} per unit. The total contract value is $${formData.amount * formData.price}.

The produce will be delivered on ${formData.deliveryDate}. The Customer has specified the following special requirements: ${formData.requirements}.

Both parties agree to the terms and conditions set forth in this agreement. Any disputes arising from this contract shall be resolved through mutual negotiation or, if necessary, through mediation by a neutral third party.

This contract is binding and represents the entire agreement between the Farmer and the Customer.

Signed:
____________________    ____________________
[Farmer Name]           ${formData.customerName}`;

        setContract(contractText);
    };

    return (
        <div className="contract-creation">
            <div className="header">
                <h1>Contract Creation</h1>
            </div>
            <div className="contract-form-container">
                <h2>Create New Contract</h2>
                <form onSubmit={generateContract}>
                    <input
                        type="text"
                        name="customerName"
                        placeholder="Customer Name"
                        value={formData.customerName}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="produceType"
                        placeholder="Produce Type"
                        value={formData.produceType}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="number"
                        name="amount"
                        placeholder="Amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Price per Unit"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                    />
                    <textarea
                        name="requirements"
                        placeholder="Special Requirements"
                        value={formData.requirements}
                        onChange={handleInputChange}
                    />
                    <input
                        type="date"
                        name="deliveryDate"
                        value={formData.deliveryDate}
                        onChange={handleInputChange}
                        required
                    />
                    <button type="submit">Generate Contract</button>
                </form>
            </div>
            {contract && (
                <div className="contract-preview">
                    <h2>Contract Preview</h2>
                    <div className="preview-text">
                        {contract.split('\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                    <PDFDownloadLink document={<MyDocument contractText={contract} />} fileName="contract.pdf">
                        {({ blob, url, loading, error }) =>
                            loading ? 'Loading document...' : 'Download Contract as PDF'
                        }
                    </PDFDownloadLink>
                </div>
            )}
        </div>
    );
};

export default ContractCreation;