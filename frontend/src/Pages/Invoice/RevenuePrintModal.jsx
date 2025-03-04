import React, { useState } from 'react';

const RevenuePrintModal = ({
  isOpen,
  onClose,
  revenueData,
  partyData = [],
  onPrint
}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedParty, setSelectedParty] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState('IDR');
  const [exchangeRate, setExchangeRate] = useState('0.00');

  const handleItemSelect = (item) => {
    setSelectedItems(prevSelected =>
      prevSelected.includes(item)
        ? prevSelected.filter(selectedItem => selectedItem !== item)
        : [...prevSelected, item]
    );
  };

  const handlePartyChange = (e) => {
    const selectedPartyObject = partyData.find(
      party => (party._id || party.value) === e.target.value
    );
    setSelectedParty(selectedPartyObject);
  };

  const handleCurrencyChange = (e) => {
    const newCurrency = e.target.value;
    setSelectedCurrency(newCurrency);
    if (newCurrency === 'IDR') {
      setExchangeRate('0.00');
    }
  };

  const handleExchangeRateChange = (e) => {
    if (selectedCurrency === 'IDR') return;
    
    const value = e.target.value.replace(/[^0-9.]/g, '');
    const parts = value.split('.');
    if (parts.length > 2) return;
    setExchangeRate(value);
  };

  const handlePrint = () => {
    onPrint({
      selectedItems,
      selectedParty,
      selectedCurrency,
      exchangeRate: parseFloat(exchangeRate) || 0.00
    });
    onClose();
  };

  return (
    <>
      <div 
        className={isOpen ? 'modal d-block' : 'modal'}
        tabIndex="-1" 
        role="dialog"
        style={{ backgroundColor: isOpen ? 'rgba(0,0,0,0.5)' : 'transparent' }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Select Revenue Items to Print</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>

            <div className="modal-body">
              <div className="row mb-3">
                <div className="col-md-4">
                  <label htmlFor="partySelect" className="form-label">Select Party</label>
                  <select
                    id="partySelect"
                    className="form-select"
                    value={selectedParty ? (selectedParty._id || selectedParty.value) : ''}
                    onChange={handlePartyChange}
                  >
                    <option value="">Choose a party...</option>
                    {partyData.map((party, index) => (
                      <option key={index} value={party._id || party.value}>
                        {party.name || party.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4">
                  <label htmlFor="currencySelect" className="form-label">Select Currency</label>
                  <select
                    id="currencySelect"
                    className="form-select"
                    value={selectedCurrency}
                    onChange={handleCurrencyChange}
                  >
                    <option value="USD">USD</option>
                    <option value="IDR">IDR</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label htmlFor="exchangeRate" className="form-label">Total Amount</label>
                  <input
                    type="text"
                    id="exchangeRate"
                    className="form-control"
                    value={exchangeRate}
                    onChange={handleExchangeRateChange}
                    placeholder="Enter total amount"
                    disabled={selectedCurrency === 'IDR'}
                  />
                </div>
              </div>

              {revenueData && revenueData.length > 0 ? (
                <div className="list-group mt-3">
                  {revenueData.map((item, index) => (
                    <label
                      key={index}
                      className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                    >
                      <div className="flex-grow-1">
                        <div className="fw-medium">{item?.description || 'No Name'}</div>
                        <small className="text-muted">
                          Rate: {item?.Revenurate} | LC Amount: {item.RevenueLcAmount} | NetLc: {item?.NetLc ?? 0}
                        </small>
                      </div>
                      <input
                        type="checkbox"
                        className="form-check-input ms-2"
                        checked={selectedItems.includes(item)}
                        onChange={() => handleItemSelect(item)}
                      />
                    </label>
                  ))}
                </div>
              ) : (
                <div className="alert alert-info text-center">No revenue data available</div>
              )}
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button
                type="button"
                className="btn btn-primary"
                disabled={selectedItems.length === 0 || !selectedParty || (selectedCurrency === 'USD' && !exchangeRate)}
                onClick={handlePrint}
              >
                Print Selected Items
              </button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && <div className="modal-backdrop fade show" onClick={onClose}></div>}
    </>
  );
};

export default RevenuePrintModal;