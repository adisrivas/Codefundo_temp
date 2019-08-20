# Codefundo++ idea proposal

- Basic Structure of our Block-chain solution:

Our solution would contain a web interface for people to register by either creating their own node or using a pre-existing node. The nodes will be of two types 

1. Admin nodes maintained by Election Commission to administer the events of voting using the block-chain and distribute vote tokens.
2. User nodes maintained by users to register and get vote tokens and use them to cast their vote.

On the same web portal the user can spend its vote token once the voting begins to vote for suitable canditate and get other useful voting stats.

- Working of the System:

Each user node has computing power of its own computer /mobile device which can be used to commit a transaction.
Transaction by a user can be of two types
1. Registering of a voter.
2. Spending vote token.

Registering a voter requires voter to enter its aadhar number which can be verified either by fingerprint or OTP on the registered mobile number. After this the voter will enter its secret which would then be hashed with user details to give each voter a unique id which can be assumed to be a voter ID. Now this acts like a trapdoor function where user’s secret and aadhar info can be used to get the voter ID but not vice-versa. 
A user node can have multiple vote tokens for different registration. So a person without a compute power can register using any nearby trusted user node.

After registration a user will be allotted a vote token. This vote would contain the unique ID generated for the user, its own Unique ID, Date of Creation, Party Voted, Constituency of User.

Casting vote transaction requires that your unique ID generated from aadhar and secret should have been already registered. Thus a user can vote by spending his/her vote token using our web portal.

The admin node will take care of putting special transactions which would be used as temporal checkpoints for 
1. Adding new Mining nodes
2. Start/End of voter’s registration
3. Start/End of the voting.
 
Our web server would be running various functions to count total registered users, number of votes to each constituency party wise and other important details and would be triggered by each new block of vote tokens mined and updating the web portal with the information.

Re-registering for voting needs to be done for every voting season. Admin Node will insert a new checkpoint before which all the registered participants become invalid. This is a way to prevent *Zombie voters*( voters who have died or would not vote) in our voting list.

- Features that the system provides:
1. Easy Registration of voters with proper verification.
2. Voters can cast their vote from any Location using web (REST) interface.
3. Votes stats in real time.
4. Removal of Zombie voters through re-registration.
5. Block-chain implicit capability to avoid any manipulation.

- Dataset Used:
We will create our own dataset of aadhar info and data mapping from present address to constituency.

- Technologies Used:
1. Node for rest api
2. Truffle as the framework
3. Solidify for smart-contract creation
4. Azure Block-chain services for node creation and management.
5. HTML, CSS, Javascript for frontend
