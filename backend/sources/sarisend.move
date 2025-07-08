module sarisend::sarisend {
    public entry fun send_payment(account: &signer, to: address, amount: u64) {
        aptos_account::transfer(to, amount);
    }
}

    