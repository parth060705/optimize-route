import { useState } from 'react';
import axios from 'axios';

function MultiAddressForm({ onGeocodeComplete }) {
  const [addresses, setAddresses] = useState(['']);
  const [coordinates, setCoordinates] = useState([]);

  const handleChange = (index, value) => {
    const updated = [...addresses];
    updated[index] = value;
    setAddresses(updated);
  };

  const addAddress = () => {
    setAddresses([...addresses, '']);
  };

  const removeAddress = (index) => {
    const updated = addresses.filter((_, i) => i !== index);
    setAddresses(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const results = await Promise.all(
        addresses.map(async (address) => {
          const res = await axios.get('https://nominatim.openstreetmap.org/search', {
            params: {
              q: address,
              format: 'json',
              addressdetails: 1,
              limit: 1,
            },
            headers: {
              'Accept-Language': 'en'
            },
          });
          const result = res.data[0];
          return result
            ? { address, lat: parseFloat(result.lat), lon: parseFloat(result.lon) }
            : { address, lat: null, lon: null };
        })
      );

      setCoordinates(results);

      // Filter and transform valid results
      const geocodedPath = results
        .filter(item => item.lat && item.lon)
        .map(item => [item.lat, item.lon]);

      // Pass path to parent
      if (onGeocodeComplete) {
        onGeocodeComplete(geocodedPath);
      }

      console.log('Coordinates:', results);
      alert('Geocoding complete. See map and console for details.');
    } catch (error) {
      console.error(error);
      alert('Failed to fetch coordinates.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.heading}>Enter Multiple Addresses</h2>

      {addresses.map((address, index) => (
        <div key={index} style={styles.addressContainer}>
          <input
            type="text"
            placeholder={`Address ${index + 1}`}
            value={address}
            onChange={(e) => handleChange(index, e.target.value)}
            required
            style={styles.input}
          />
          {addresses.length > 1 && (
            <button
              type="button"
              onClick={() => removeAddress(index)}
              style={styles.removeButton}
            >
              Remove
            </button>
          )}
        </div>
      ))}

      <button type="button" onClick={addAddress} style={styles.addButton}>
        Add Address
      </button>

      <button type="submit" style={styles.submitButton}>
        Submit & Geocode
      </button>

      {coordinates.length > 0 && (
        <div style={styles.resultContainer}>
          <h3 style={styles.resultContainer}>Results:</h3>
          <ul>
            {coordinates.map((item, i) => (
              <li key={i}>
                {item.address}: {item.lat && item.lon ? `${item.lat}, ${item.lon}` : 'Not found'}
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
}

const styles = {
  form: {
    maxWidth: '400px',
    margin: 'auto',
    padding: '2rem',
    background: '#6b21a8',
    borderRadius: '1rem',
    border: '1px solid #ffffff',
  },
  heading: {
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: '1.5rem',
  },
  addressContainer: {
    marginBottom: '1rem',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '0.375rem',
    border: '1px solid #ffffff',
    color: '#6b21a8',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
  },
  removeButton: {
    background: '#ffffff',
    color: '#dc2626',
    border: 'none',
    padding: '0.4rem 0.8rem',
    marginTop: '0.3rem',
    cursor: 'pointer',
    borderRadius: '4px',
  },
  addButton: {
    background: '#ffffff',
    color: '#6b21a8',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    marginBottom: '1rem',
  },
  submitButton: {
    display: 'block',
    width: '100%',
    background: '#ffffff',
    color: '#6b21a8',
    padding: '0.7rem',
    borderRadius: '0.375rem',
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: '1.5rem',
    color: '#ffffff',
  },
};

export default MultiAddressForm;
