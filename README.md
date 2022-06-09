# Vaccine Blocks: - Blockchain based vaccine supplychain using Encrypted QRcode <a name="TOP"></a>

## Motivation – Scale of the problem

    * The covid vaccine distribution is the biggest supply chain challenge that mankind has ever seen.
    * The reach of a vaccine distribution in best scenario was not up to 85% of intended population.
    * Distributing vaccine to 8 billion population : 8000 - 747 cargo planes.
    * The cost of vaccine production is around 30 to 40 percent, rest is delivery.
    * COVID19 virus is mutating, periodic updates in vaccine might be required.

## Challenges

    * Message integrity –  Product details can be tampered in the server by anyone
    * Replay attack – Instead of new product data, old data is input onto the server
    * Difficult to verify Authenticity – What server gets from manufacturer A, may be manufactured by manufacturer B
    * Centralized ownership – Only a small subset of participants own the network
    * Repudiation – If server shows that counterfeit was introduced by distributor X, X can deny and say that here was a MITM attack. 
    * Fake product getting introduced during transit from OEM to customer

## Approach

    * Message integrity is achieved by Hashing messages before they are sent 
    * Replay attack is mitigated with the help of Authentic Time Stamping on each message
    * Repudiation and difficulty in verifying authenticity are solved using Digital Signature assuming that digital signatures cannot be forged, and private keys are kept safe.   
    * The Centralized ownership problem is solved using Blockchain 
    * Encrypted QR code and encrypted & password protected RFID is used on low value product and high value products respectively in order to minimize counterfeits

## Results

    * Achieved better visibility of manufactured product whereabouts
    * Minimized scope for introducing counterfeits for high value and low value item
    * Proposed solution requires minimum amount of effort from the participant