module sarisend::sarisend {
    public entry fun send_payment(account: &signer, to: address, amount: u64) {
        aptos_account::transfer(to, amount);
    }
}

// aptos account: 0xa6f73c189fefdbf3c1e92291d8baf18f6183f744701e40fb4ea7b1b77546b2f7