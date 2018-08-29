export class UserSession {
  oid: number; 
	user: String;
	role : String ; 
    /* Possible values corresponds to Class Names in Ratatoullie's backend (src/main/java/model/)
     * "Administrator"
     * "NormalClient"
     * "Responsible"
     * */
	rankingDTO : String; 

}
