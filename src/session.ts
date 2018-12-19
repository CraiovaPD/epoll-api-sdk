/**
 * Class used for storring session information.
 *
 * @author Dragos Sebestin
 */
export class Session {

  /**
   * Class constructor.
   */
  constructor (public tokenType: string, public token: String) {}
}
